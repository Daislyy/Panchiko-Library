import { parse } from "next/dist/build/swc/generated-native"
import z from "zod"

export default function home() {
    let user = {
        username: 'wahid',
        email   : 'wahid@gmail.com'
    }

    let rule = z.object({
        username: z.string().min(6).max(20),
        email : z.email()
    })

    let hasil = peraturan.safeParse(username)    

    console.log (hasil)



}