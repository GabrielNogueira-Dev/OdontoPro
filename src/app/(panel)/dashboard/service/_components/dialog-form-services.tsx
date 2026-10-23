import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    name: z.string().min(1, { message: "O nome do serviço é obrigatório"}),
    price: z.string()
        .min(1, { message: "O preço do serviço é obrigatório"})
        .regex(/^(?:R\$\s*)?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/, {
            message: "Informe o preço em reais, por exemplo: 120,00.",
        }),
    hours: z.string().regex(/^\d*$/, { message: "Informe as horas usando números." }),
    minutes: z.string().regex(/^\d*$/, { message: "Informe os minutos usando números." }),
})

export interface UseDialogServiceFormProps{
  initialValues?:{
    name: string;
    price: string;
    hours: string;
    minutes: string;
  }
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm(){

    return useForm<DialogServiceFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:  "",
            price: "",
            hours:  "",
            minutes:  ""
        }
    })


}