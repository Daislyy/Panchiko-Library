import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserBorrows } from "../lib/actions";
import MyBorrowsClient from "../components/MyBorrowsClient";

export default async function MyBorrowsPage() {
  const session = await getServerSession(authOptions);

  // Redirect jika belum login
  if (!session) {
    redirect("/login");
  }

  // Fetch data borrows
  const result = await getUserBorrows(session.user.id);
  const borrows = result.success ? result.data : [];

  return (
    <MyBorrowsClient
      borrows={borrows}
      username={session.user.username || session.user.name}
      profilePicture={session.user.profile_picture || session.user.image}
    />
  );
}
