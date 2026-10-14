import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"        

interface UseProfileFormProps{
        name: string | null;
        address: string | null;
        phone: string | null;
        status: boolean;
        timeZone: string | null;
}

const profileFormSchema = z.object({
    name: z.string().min(3, {message: "O nome precisa de no mínimo 3 caracteres."}),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.enum(["active", "inactive"]),
    timeZone: z.string().min(3, {message: "O timezone é obrigatório."})
})

export type ProfileFormData = z.infer<typeof profileFormSchema>; // Define the type for the form data based on the schema

export function useProfileForm({ name, address, phone, status, timeZone }: UseProfileFormProps){

    return useForm<ProfileFormData>({
       resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: name || "",
            address: address || "",
            phone:phone || "",
            status: status ? "active" : "inactive",
            timeZone: timeZone || "",
        }
        })
}