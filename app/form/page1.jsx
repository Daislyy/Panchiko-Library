import { parse } from "next/dist/build/swc/generated-native"
import z from "zod"

export default function home() {
    let username = 'padly' 

    let rule = z.string().min(6).max(20)

    let hasil = peraturan.safeParse(username)    

    console.log (hasil)



}