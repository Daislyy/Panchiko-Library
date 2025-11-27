"use server";

import bcrypt from "bcryptjs";
import connection from "./database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import path from "path";
import { writeFile } from "fs/promises";

/* validasi */
const userSchema = z.object({
  username: z.string().min(3, "Username terlalu pendek"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
  role: z.enum(["admin", "siswa"]).default("siswa"),
});

const bookSchema = z.object({
  nama_buku: z.string().min(1, "Nama buku harus diisi"),
  author: z.string().min(1, "Author harus diisi"),
  genre: z.string().nullable().optional(),
  prolog: z.string().nullable().optional(),
  stock: z.number().min(0, "Stok tidak boleh negatif").optional(),
});

// user manage
export async function storeUser(formData) {
  const data = userSchema.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  const file = formData.get("profile_picture");
  let imagePath = "/images/default-avatar.png";

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  const hashed = bcrypt.hashSync(data.password);

  await connection.execute(
    "INSERT INTO users (username, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?)",
    [data.username, data.email, hashed, data.role, imagePath]
  );

  revalidatePath("/login");
  redirect("/login");
}

export async function getUserByEmail(email) {
  const [rows] = await connection.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

export async function authenticateUser(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    return { success: false, error: "User tidak ditemukan" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { success: false, error: "Password salah" };
  }

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile_picture: user.profile_picture,
    },
  };
}

export async function updateUserProfile(userId, formData) {
  const data = userSchema.partial().parse({
    username: formData.get("username"),
    email: formData.get("email"),
  });

  const file = formData.get("profile_picture");
  let imagePath = formData.get("currentImage") || null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  await connection.execute(
    "UPDATE users SET username=?, email=?, profile_picture=? WHERE id=?",
    [data.username, data.email, imagePath, userId]
  );

  revalidatePath("/profile");
  return { success: true };
}

/* BORROW BOOK FUNCTIONS */
export async function borrowBook(userId, bookId) {
  const [existing] = await connection.execute(
    "SELECT * FROM borrows WHERE user_id = ? AND book_id = ? AND status IN ('pending', 'borrowed')",
    [userId, bookId]
  );

  if (existing.length > 0) {
    return {
      success: false,
      error: "Anda sudah memiliki peminjaman aktif untuk buku ini",
    };
  }

  const borrowDate = new Date().toISOString().split("T")[0];
  const returnDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  await connection.execute(
    "INSERT INTO borrows (user_id, book_id, borrow_date, return_date, status) VALUES (?, ?, ?, ?, 'pending')",
    [userId, bookId, borrowDate, returnDate]
  );

  revalidatePath("/dashboard");
  revalidatePath("/admin/transactions");
  return {
    success: true,
    message:
      "Permintaan peminjaman berhasil dikirim. Menunggu persetujuan admin.",
  };
}

export async function getUserBorrows(userId) {
  const [borrows] = await connection.execute(
    `
    SELECT 
      b.borrow_id,
      b.borrow_date,
      b.return_date,
      b.status,
      bk.book_id,
      bk.nama_buku,
      bk.author,
      bk.cover_image
    FROM borrows b
    INNER JOIN buku bk ON b.book_id = bk.book_id
    WHERE b.user_id = ?
    ORDER BY b.borrow_date DESC
  `,
    [userId]
  );

  return { success: true, data: borrows };
}

/* ADMIN FUNCTIONS */
export async function getAllTransactions() {
  const [transactions] = await connection.execute(`
    SELECT 
      b.borrow_id,
      b.user_id,
      u.username,
      u.email,
      b.book_id,
      bk.nama_buku,
      bk.author,
      bk.cover_image,
      b.borrow_date,
      b.return_date,
      b.status
    FROM borrows b
    INNER JOIN users u ON b.user_id = u.id
    INNER JOIN buku bk ON b.book_id = bk.book_id
    ORDER BY 
      CASE 
        WHEN b.status = 'pending' THEN 1
        WHEN b.status = 'borrowed' THEN 2
        WHEN b.status = 'returned' THEN 3
        ELSE 4
      END,
      b.borrow_id DESC
  `);

  return { success: true, data: transactions };
}

export async function updateTransactionStatus(borrowId, status) {
  // Get borrow info
  const [borrow] = await connection.execute(
    "SELECT book_id FROM borrows WHERE borrow_id = ?",
    [borrowId]
  );

  if (borrow.length === 0) {
    return { success: false, error: "Peminjaman tidak ditemukan" };
  }

  const bookId = borrow[0].book_id;

  // Update borrow status
  await connection.execute(
    "UPDATE borrows SET status = ? WHERE borrow_id = ?",
    [status, borrowId]
  );

  // Update available stock based on status
  if (status === "borrowed") {
    // Kurangi stok tersedia
    await connection.execute(
      "UPDATE buku SET available_stock = available_stock - 1 WHERE book_id = ? AND available_stock > 0",
      [bookId]
    );
  } else if (status === "returned") {
    // Tambah kembali stok tersedia
    await connection.execute(
      "UPDATE buku SET available_stock = available_stock + 1 WHERE book_id = ?",
      [bookId]
    );
  }

  revalidatePath("/admin/transactions");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function rejectBorrow(borrowId) {
  // Get borrow info to check if it was borrowed
  const [borrow] = await connection.execute(
    "SELECT book_id, status FROM borrows WHERE borrow_id = ?",
    [borrowId]
  );

  if (borrow.length > 0 && borrow[0].status === "borrowed") {
    // Jika statusnya borrowed, kembalikan stok
    await connection.execute(
      "UPDATE buku SET available_stock = available_stock + 1 WHERE book_id = ?",
      [borrow[0].book_id]
    );
  }

  // Delete the borrow record
  await connection.execute("DELETE FROM borrows WHERE borrow_id = ?", [
    borrowId,
  ]);

  revalidatePath("/admin/transactions");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getAllMembers() {
  const [members] = await connection.execute(`
    SELECT id, username, email, role, profile_picture, created_at
    FROM users 
    ORDER BY created_at DESC
  `);

  return { success: true, data: members };
}

export async function addMember(formData) {
  const data = userSchema.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  const file = formData.get("profile_picture");
  let imagePath = "/images/default-avatar.png";

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  const hashed = bcrypt.hashSync(data.password);

  const [result] = await connection.execute(
    "INSERT INTO users (username, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?)",
    [data.username, data.email, hashed, data.role, imagePath]
  );

  if (!result.insertId) {
    return { success: false, error: "Username atau email sudah terdaftar" };
  }

  revalidatePath("/admin/members");
  return { success: true };
}

export async function updateMember(userId, formData) {
  const data = userSchema.partial().parse({
    username: formData.get("username"),
    email: formData.get("email"),
    role: formData.get("role"),
  });

  const file = formData.get("profile_picture");
  let imagePath = formData.get("currentImage") || null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  await connection.execute(
    "UPDATE users SET username=?, email=?, role=?, profile_picture=? WHERE id=?",
    [data.username, data.email, data.role, imagePath, userId]
  );

  revalidatePath("/admin/members");
  return { success: true };
}

export async function deleteMember(userId) {
  await connection.execute("DELETE FROM users WHERE id=?", [userId]);
  revalidatePath("/admin/members");
  return { success: true };
}

/* BOOK MANAGEMENT FUNCTIONS */
export async function getAllBooks() {
  const [books] = await connection.execute(`
    SELECT book_id, nama_buku, author, genre, cover_image, prolog, stock, available_stock, created_at
    FROM buku 
    ORDER BY created_at DESC
  `);

  return { success: true, data: books };
}

export async function addBook(formData) {
  const stock = parseInt(formData.get("stock")) || 0;

  const data = bookSchema.parse({
    nama_buku: formData.get("nama_buku"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    prolog: formData.get("prolog"),
    stock: stock,
  });

  const file = formData.get("cover_image");
  let imagePath = "/images/default-book-cover.png";

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  await connection.execute(
    "INSERT INTO buku (nama_buku, author, genre, cover_image, prolog, stock, available_stock) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      data.nama_buku,
      data.author,
      data.genre,
      imagePath,
      data.prolog,
      data.stock,
      data.stock,
    ]
  );

  revalidatePath("/admin/books");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateBook(bookId, formData) {
  const stock = parseInt(formData.get("stock")) || 0;

  const data = bookSchema.parse({
    nama_buku: formData.get("nama_buku"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    prolog: formData.get("prolog"),
    stock: stock,
  });

  const file = formData.get("cover_image");
  let imagePath = formData.get("currentImage") || null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(path.join(uploadDir, filename), buffer);
    imagePath = `/uploads/${filename}`;
  }

  const [borrowed] = await connection.execute(
    "SELECT COUNT(*) as count FROM borrows WHERE book_id = ? AND status = 'borrowed'",
    [bookId]
  );

  const borrowedCount = borrowed[0].count;
  const newAvailableStock = Math.max(0, data.stock - borrowedCount);

  await connection.execute(
    "UPDATE buku SET nama_buku=?, author=?, genre=?, cover_image=?, prolog=?, stock=?, available_stock=? WHERE book_id=?",
    [
      data.nama_buku,
      data.author,
      data.genre,
      imagePath,
      data.prolog,
      data.stock,
      newAvailableStock,
      bookId,
    ]
  );

  revalidatePath("/admin/books");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteBook(bookId) {
  await connection.execute("DELETE FROM buku WHERE book_id=?", [bookId]);
  revalidatePath("/admin/books");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getBookById(bookId) {
  const [rows] = await connection.execute(
    "SELECT * FROM buku WHERE book_id = ?",
    [bookId]
  );
  return { success: true, data: rows[0] || null };
}
