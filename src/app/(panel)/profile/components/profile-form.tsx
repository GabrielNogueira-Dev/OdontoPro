import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"        

const profileFormSchema = z.object({
    name: z.string().min(3, {message: "O nome precisa de no mínimo 3 caracteres."}),
    email: z.string().email({message: "Digite um e-mail válido."}),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    timeZone: z.string().min(3, {message: "O timezone é obrigatório."})
})

type ProfileFormData = z.infer<typeof profileFormSchema>; // Define the type for the form data based on the schema

export function useProfileForm(){

    return useForm<ProfileFormData>({
       resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            phone: "",
            status: "active",
            timeZone: ""
        }
        })
}