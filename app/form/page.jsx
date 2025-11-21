"use client";

import { useState } from "react";

export default function Page() {
  const [user, Username] = useState("");
  const [password, Pass] = useState("");

  function form() {
    alert(`username : ${user}\n password ${password}`);
  }

  return (
    <div>
      <input
        onChange={(e) => Username(e.target.value)}
        type="text"
        className="border justify-center text-white"
      />
      <br />
      <input
        onChange={(e) => Pass(e.target.value)}
        type="text"
        className="border justify-center text-white"
      />
      <br />
      <button onClick={form}>Submit</button>
    </div>
  );
}
