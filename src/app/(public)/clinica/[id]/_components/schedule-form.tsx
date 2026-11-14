"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { useForm } from "react-hook-form"

export const appointmentSchema = z.object({
    name: z.string().min(3, {message: "O nome precisa ter no mínimo 3 caracteres"}),
    email: z.string().email({message: "Digite um e-mail válido"}),
    phone: z.string().min(10, {message: "Digite um número de telefone válido"}),
    date: z.date(),
    serviceId: z.string().min(1, {message: "Selecione um serviço"})
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

export function useAppointmentForm() {
    return useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            date: new Date(),
            serviceId: ""
        }
    })
}