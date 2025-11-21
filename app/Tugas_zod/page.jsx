import z from "zod"

export default function home() {
    let user = {
        Namalengkap: 'Padly Padilah',
        Nik : 1234578,
        email: 'dlyy@gmail.com',
        Ntlp: +6281319233748,
        Pendidikan : ["SMK","SMA"]
    }

    let rule = z.object({
        Namalengkap: z.string().min(6).max(20),
        Nik : z.number( ),
        email: z.email(),
        Ntlp: z.number(),
        Pendidikan : z.array(z.string())
    })

    let hasil = rule.safeParse(user)    

    console.log (hasil)



}