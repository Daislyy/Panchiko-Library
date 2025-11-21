"use server";

import bcrypt from "bcryptjs";
import connection from "./database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import path from "path";
import { writeFile } from "fs/promises";

/* validasod */
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

/* admin*/
export async function getAllTransactions() {
  try {
    const [transactions] = await connection.execute(`
      SELECT 
        b.borrow_id,
        u.username,
        bk.nama_buku,
        b.borrow_date,
        b.return_date,
        b.status
      FROM borrows b
      INNER JOIN users u ON b.user_id = u.id
      INNER JOIN buku bk ON b.book_id = bk.book_id
      ORDER BY b.borrow_date DESC
    `);

    return { success: true, data: transactions };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateTransactionStatus(borrowId, status) {
  try {
    await connection.execute(
      "UPDATE borrows SET status = ? WHERE borrow_id = ?",
      [status, borrowId]
    );

    revalidatePath("/admin/transactions");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAllMembers() {
  try {
    const [members] = await connection.execute(`
      SELECT id, username, email, role, profile_picture, created_at
      FROM users 
      ORDER BY created_at DESC
    `);

    return { success: true, data: members };
  } catch (error) {
    return { success: false, error: error.message };
  }
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

  try {
    await connection.execute(
      "INSERT INTO users (username, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?)",
      [data.username, data.email, hashed, data.role, imagePath]
    );

    revalidatePath("/admin/members");
    return { success: true };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return { success: false, error: "Username atau email sudah terdaftar" };
    }
    return { success: false, error: error.message };
  }
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

export async function getAllBooks() {
  try {
    const [books] = await connection.execute(`
      SELECT book_id, nama_buku, author, genre, cover_image, prolog, created_at
      FROM buku 
      ORDER BY created_at DESC
    `);

    return { success: true, data: books };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addBook(formData) {
  const data = bookSchema.parse({
    nama_buku: formData.get("nama_buku"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    prolog: formData.get("prolog"),
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
    "INSERT INTO buku (nama_buku, author, genre, cover_image, prolog) VALUES (?, ?, ?, ?, ?)",
    [data.nama_buku, data.author, data.genre, imagePath, data.prolog]
  );

  revalidatePath("/admin/books");
  return { success: true };
}

export async function updateBook(bookId, formData) {
  const data = bookSchema.parse({
    nama_buku: formData.get("nama_buku"),
    author: formData.get("author"),
    genre: formData.get("genre"),
    prolog: formData.get("prolog"),
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

  await connection.execute(
    "UPDATE buku SET nama_buku=?, author=?, genre=?, cover_image=?, prolog=? WHERE book_id=?",
    [data.nama_buku, data.author, data.genre, imagePath, data.prolog, bookId]
  );

  revalidatePath("/admin/books");
  return { success: true };
}

export async function deleteBook(bookId) {
  await connection.execute("DELETE FROM buku WHERE book_id=?", [bookId]);
  revalidatePath("/admin/books");
  return { success: true };
}

/// detail
export async function getBookById(bookId) {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM buku WHERE book_id = ?",
      [bookId]
    );
    return { success: true, data: rows[0] || null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}