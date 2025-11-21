"use client";
import { useState } from "react";
import * as z from "zod";

export default function TugasValidasi2() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");      

  function updateUsername(event) {
    setUsername(event.target.value);
  }

  function updateEmail(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    const rule = z.object({
      username: z.string().min(6).max(20),
      email: z.email(),
    });

    const result = rule.safeParse({ username, email });

    if (result.success) {
      alert("Submit Berhasil");
      console.log("Submit Berhasil", { username, email });
    } else {
      alert("Submit Gagal");
      console.log("Submit Gagal", result.error);
    }
  }

  return (
    <div className="justify-center items-center flex flex-col p-10 min-h-screen bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-6">Validasi Test</h1>

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <input
          type="text"
          onChange={updateUsername}
          className="bg-gray-700 text-white rounded-xl border-2 border-gray-600 p-3 w-full mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Username"
        />

        <input
          type="text"
          onChange={updateEmail}
          className="bg-gray-700 text-white rounded-xl border-2 border-gray-600 p-3 w-full mb-6 focus:outline-none focus:border-blue-500"
          placeholder="Email"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl p-3 w-full transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
