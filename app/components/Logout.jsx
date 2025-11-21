"use client"

import { signOut } from "next-auth/react"

export default function Logout() {
    return (
        <button
            onClick={signOut}
            className="text-red-400
         ">log out</button>
    )
}