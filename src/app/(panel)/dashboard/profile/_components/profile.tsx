"use client"

import { ProfileFormData, useProfileForm } from "./profile-form"

import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card"

import {Form, FormControl,
     FormField,
   FormItem,FormLabel,FormMessage} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import {Label} from "@/components/ui/label"

import {
      Dialog, DialogContent,
  DialogDescription,DialogHeader,
    DialogTitle,DialogTrigger,} from "@/components/ui/dialog"

import imgTest from "../../../../../../public/foto1.png"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { cn } from "cn"
import { Prisma } from "@/generated/prisma/client"
import { updateProfile } from "../_actions/update-profile"
import { extractPhoneNumber, formatPhone } from "@/utils/formatPhone"
import {toast} from "sonner"

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true
  }
}> 

interface ProfileContenProps{
  user:UserWithSubscription;
}

export function ProfileContent( {user} :ProfileContenProps) {

    const [dialogIsOpen,setDialogIsOpen] = useState(false)
    const [selectedHours,setSelectedHours] = useState<string[]>(() => user.times ?? [])

  const form = useProfileForm({
    name: user.name,
    address: user.adress,
    phone: user.phone,
    status: user.status,
    timeZone: user.timeZone
  });

  function generateTimeSlotes(): string[] {
    const hours: string[] = []

    for (let i = 8; i <= 18; i ++){
        for (let j = 0; j < 2; j ++){
            const hour = i.toString().padStart(2,"0")
            const minute = (j * 30).toString().padStart(2,"0")
            hours.push(`${hour}:${minute}`)
        }
    } 
    return hours
  }
  const hours = generateTimeSlotes()
  
function togglerHour(hour:string){
    setSelectedHours((prev)=> prev.includes(hour) ? prev.filter( h => h !== hour) : [...prev,hour].sort()) 
        // o que tem incluido na hora(prev) ja existe ? se existir filtra e remove comparando com a que tem, se nao tem pega o spread e poe a hora a mais que colocou
}

    const timeZones = Intl.supportedValuesOf("timeZone").filter((zone) => 
    zone.startsWith("America/Sao_Paulo") ||
    zone.startsWith("America/Fortaleza") ||
    zone.startsWith("America/Recife") ||
    zone.startsWith("America/Bahia") ||
    zone.startsWith("America/Belem") ||
    zone.startsWith("America/Manaus") ||
    zone.startsWith("America/Cuiaba") ||
    zone.startsWith("America/Boa_Vista")
    )

    async function onSubmit(values: ProfileFormData){
      
         // const extractValue = extractPhoneNumber( values.phone || "") pega numero sem sinais () e -

       const response = await updateProfile({
        name: values.name,
        address: values.address,
        status: values.status === "active" ? true : false ,
        timeZone: values.timeZone,
        phone: values.phone,
        times: selectedHours || []
       })

if(response.error){
  toast.error(response.error)
}

    }

  return (
    <div className='mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex justify-center'>
                <div className='bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                  <Image
                    src={user.image ? user.image : imgTest}
                    alt="Foto da clinica"
                    fill
                    className='object-cover'
                  />
                </div>
              </div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Digite o nome da clinica...'
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>
                        Endereço completo:
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Digite o endereço da clinica...'
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>
                        Telefone
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='(99) 91234-5678'
                          onChange={ (e) => { // A mascara aplicada pelo regex na @util/formatPhone.ts
                            const formatedValue = formatPhone(e.target.value)
                          field.onChange(formatedValue)} //peguei a const e joguei no field pra mudar automaticamente pra aplicacao da mascara
                          }
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>
                        Status da clinica
                      </FormLabel>
                      <FormControl>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status da clincia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">ATIVO (clinica aberta)</SelectItem>
                            <SelectItem value="inactive">INATIVO (clinica fechada)</SelectItem>
                          </SelectContent>
                        </Select>

                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className= "space-y-2">
                  <Label className = "font-semibold">
                    Configurar horários da clínica
                  </Label>

                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                Clique aqui para selecionar horários
                                <ArrowRight className="w-5 h-5"/>
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Horários da clínica</DialogTitle>
                                <DialogDescription>
                                    Selecione os horários de funcionamento da clínica:
                                </DialogDescription>
                            </DialogHeader>

                            <section className="py-4">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Clique nos horários abaixo para  marcar e desmarcar:
                                </p>

                                <div className="grid grid-cols-5 gap-2">
                                    {hours.map((hour)=> (
                                        <Button key={hour} 
                                        variant="outline"
                                        className={cn(`h-10 cursor-pointer`, selectedHours.includes(hour) && "border-2 border-emerald-500 text-primary")}
                                        onClick={()=> togglerHour(hour)}
                                        >
                                            {hour}
                                        </Button>
                                    ))}
                                </div>
                            </section>

                                    <Button className="w-full"
                                            onClick={() => setDialogIsOpen(false)}
                                    >
                                        Fechar horários
                                    </Button>

                        </DialogContent>
                    </Dialog>

                </div>

                         <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>
                        Selecione o fuso horário
                      </FormLabel>
                      <FormControl>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o seu fuso horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeZones.map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className='w-full bg-emerald-500 hover:bg-emerald-400'
                >
                  Salvar alterações
                </Button>

              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}