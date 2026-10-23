"use client"

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogServiceFormData, useDialogServiceForm } from "./dialog-form-services"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { convertRealToCents } from "@/utils/convert-currency"
import { createNewService } from "../_actions/create-service"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DialogServiceProps{
    closeModal: () => void; }

export function DialogService({ closeModal }: DialogServiceProps ){

    const form = useDialogServiceForm()
    const [loading,setLoading] = useState(false)
    const router = useRouter();

async function onSubmit(values: DialogServiceFormData){
    setLoading(true)
    const priceInCents = convertRealToCents(values.price)
    const hours = Number(values.hours || 0)
    const minutes = Number(values.minutes || 0)

    //Agora vou converter as horas e minutos pp duration (totalizo e somo)
    const duration = (hours * 60) + minutes;

    const response = await createNewService({
        name: values.name,
        price: priceInCents,
        duration: duration,
    });

    setLoading(false)
   
    if(response.error){
        toast.error(response.error)
        return;
    }
        router.refresh();

    toast.success("Serviço cadastrado com sucesso!")
    handleCloseModal();
}

function handleCloseModal(){
    form.reset();
    closeModal()
}

function changeCurrency(event: React.ChangeEvent<HTMLInputElement>){
let {value} = event.target
value = value.replace(/\D/g, "");

    if(value){
        value = (parseInt(value,10) / 100).toFixed(2);
        value = value.replace(".",","); // separa 1234,56 -> 1.234,00
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g,'.')
    }
        event.target.value = value
        form.setValue("price",value) // troca o campo price do formulario por value(valor que foi formatado)
}

    return(
          <>
    <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
    </DialogHeader>

        <Form {...form}>
            <form className="space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}>

                <div className=" flex flex-col">
                    <FormField 
                    control={form.control}
                    name="name"
                    render={ ({ field }) => (
                    <FormItem className="my-2">
                        <FormLabel>
                            Nome do serviço:
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Digite o nome do serviço.." />
                        </FormControl>
                    </FormItem>
                     )}      
                    />

                      <FormField
                    control={form.control}
                    name="price"
                    render={ ({ field }) => (
                    <FormItem className="my-2">
                        <FormLabel>
                            Preço do serviço:
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="120,00"
                            onChange={changeCurrency} />
                        </FormControl>
                    </FormItem>
                  )}      
                    />
                </div>
                    <p className="font-semibold">Duração do serviço</p>
                <div className=" grid grid-cols-2 gap-3">
                   <FormField 
                    control={form.control}
                    name="hours"
                    render={ ({ field }) => (
                    <FormItem className="my-2">
                        <FormLabel>
                            Hora
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="1"
                            min={1}
                            type="number" />
                        </FormControl>
                    </FormItem>
                  )}      
                    />
                        
                    <FormField 
                    control={form.control}
                    name="minutes"
                    render={ ({ field }) => (
                    <FormItem className="my-2">
                        <FormLabel>
                            minutos
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="10"
                            min={0}
                            type="number" />
                        </FormControl>
                    </FormItem>
                  )}      
                    />
                </div>
                    <Button className="w-full font-semibold text-white "
                    type="submit" disabled={loading}
                    >{loading ? `Cadastrando..` : "Adicionar serviço"}
                    </Button>

            </form>
        </Form>

    </>
    )
}