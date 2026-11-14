"use client"

import Image from "next/image";
import imgTeste from "../../../../../../public/foto1.png"
import { MapPin } from "lucide-react";
import { Prisma } from "@/generated/prisma/client";
import {useAppointmentForm, AppointmentFormData} from "./schedule-form";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"

type UserWithServiceAndSubscription =  
    Prisma.UserGetPayload<{
    include: {
        subscription: true;
        services: true;
    }
}>

interface ScheduleContentProps{
    clinic: UserWithServiceAndSubscription 
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {

    const form = useAppointmentForm();

    return(
        <div className = "min-h-screen flex flex-col ">
           
           <div className="h-32 bg-emerald-500"/>

            <section className= "container mx-auto px-4">
                <div className = "max-w-2xl mx-auto">
                    <article className = " flex flex-col items-center -mt-16">
                         <div className = "relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8 ">
                             <Image
                              src = {clinic.image || imgTeste}
                              alt = "foto"
                              className= "object-cover"
                              fill
                                />
                         </div>

                            <h1 className="text-2xl font-bold mb-2">{clinic.name}</h1>

                            <div className = "flex items-center gap-1">
                                <MapPin className="w-5 h-5"/>
                                <span>{clinic.adress ? clinic.adress : "Endereço não informado"}</span>
                            </div>

                    </article>
                </div>
            </section>

            {/* Formulário de agendamento */ }

            <Form {...form}>
                <form className = "space-y-4 bg-white p-6 border rounded-md shadow-sm mx-2">
                    
                <FormField 
                    control={form.control} // responsável por gerenciar o estado do formulário
                    name="name"
                    render={({field}) => ( // renderiza o campo de entrada do formulário
                        <div>
                            <FormItem>
                                <FormLabel>Nome completo:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite seu nome completo"
                                     {...field}
                                     />
                                </FormControl>     
                                <FormMessage/>                     
                            </FormItem>
                        </div>
                    )}
                />

                </form>
            </Form>

        </div>
    )
}