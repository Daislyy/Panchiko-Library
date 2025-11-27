    import { getServerSession } from "next-auth";
    import { authOptions } from "../api/auth/[...nextauth]/route";
    import { getUserByEmail } from "../lib/actions";
    import Navbar from "../components/NavSis";
    import Sidebar from "../components/Sidebar";
    import ProfileForm from "../components/ProfileForm";
    import { User, Mail, Shield, Calendar } from "lucide-react";
    import { redirect } from "next/navigation";

    export default async function ProfilePage() {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
        redirect("/login");
      }

      const email = session.user.email;
      const userData = await getUserByEmail(email);

      if (!userData) {
        return (
          <div className="flex justify-center items-center h-screen bg-[#2e2e2e]">
            <p className="text-red-500">User data not found.</p>
          </div>
        );
      }

      // tanggal
      const joinDate = userData.created_at
        ? new Date(userData.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Tidak tersedia";

      return (
        <main className="min-h-screen bg-[#2e2e2e] text-white font-[Merriweather]">
          <Navbar />

          <div className="flex pt-16">
            <Sidebar
              username={userData.username}
              profilePicture={userData.profile_picture}
            />

            <div className="flex-1 ml-64 px-8 md:px-16 py-12">
              
              <div className="max-w-5xl mx-auto mb-8">
                <h1 className="text-4xl font-bold mb-2 font-[Merriweather]">
                  Profil Saya
                </h1>
                <p className="text-gray-400 font-[Open_Sans]">
                  Kelola informasi profil Anda
                </p>
              </div>

              <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
             
                <div className="lg:col-span-1">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                
                    <div className="mb-6">
                      <div className="relative w-32 h-32 mx-auto">
                        <img
                          src={
                            userData.profile_picture ||
                            "/images/default-avatar.png"
                          }
                          alt={userData.username}
                          className="w-full h-full rounded-full object-cover border-4 border-amber-500/30"
                        />
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-[#2e2e2e]"></div>
                      </div>
                    </div>

                
                    <h2 className="text-2xl font-bold mb-2 font-[Merriweather]">
                      {userData.username}
                    </h2>
                    <p className="text-gray-400 font-[Open_Sans] mb-4">
                      {userData.email}
                    </p>

                
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
                      <Shield className="text-amber-400" size={16} />
                      <span className="text-amber-400 font-[Open_Sans] font-semibold capitalize">
                        {userData.role}
                      </span>
                    </div>

         
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-center gap-2 text-gray-400">
                        <Calendar size={18} />
                        <span className="text-sm font-[Open_Sans]">
                          Bergabung sejak
                        </span>
                      </div>
                      <p className="text-white font-semibold mt-2 font-[Open_Sans]">
                        {joinDate}
                      </p>
                    </div>
                  </div>

         
                  <div className="mt-6 space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4">
                      <div className="bg-blue-500/20 p-3 rounded-lg">
                        <User className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm font-[Open_Sans]">
                          Username
                        </p>
                        <p className="font-semibold font-[Merriweather]">
                          {userData.username}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4">
                      <div className="bg-green-500/20 p-3 rounded-lg">
                        <Mail className="text-green-400" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm font-[Open_Sans]">
                          Email
                        </p>
                        <p className="font-semibold font-[Merriweather] text-sm break-all">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

     
                <div className="lg:col-span-2">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6 font-[Merriweather]">
                      Edit Profil
                    </h3>
                    <ProfileForm user={userData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }