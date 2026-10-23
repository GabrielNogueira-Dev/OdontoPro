"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,DialogContent,DialogTrigger} from "@/components/ui/dialog"

  import {
    Card, CardContent, CardHeader, CardTitle
  } from "@/components/ui/card"

import { useState } from "react"
import { Pencil, Plus, X } from "lucide-react"
import { DialogService } from "./dialog-services"
import { Service } from "@/generated/prisma/client"
import { formatCurrency } from "@/utils/formatCurrency"
import { deleteService } from "../_actions/delete-service"
import { toast } from "sonner"

interface ServiceListProps{
  services: Service[];
}

export function ServicesList( { services }: ServiceListProps){

  console.log(services)

    const [isDialogOpen,setIsDialogOpen] = useState(false);

   async function handleDeleteService(serviceId: string){

      const res = await deleteService({ serviceId: serviceId })

      if(res.error){
        toast.error("Falha ao deletar serviço..")
      }

      toast.success(res.data)

    }

    return(
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
         <section className="mx-aut ">
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>
                    <DialogTrigger asChild >
                        <Button className="cursor-pointer">
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </DialogTrigger>

                        <DialogContent>
                          <DialogService
                          closeModal= { ()=> {
                            setIsDialogOpen(false)
                          } }
                          />
                        </DialogContent>

                </CardHeader>

                    <CardContent>
                      <section className="space-y-4 mt-5">
                          {services.map( services => (
                            <article key={services.id}
                            className="flex items-center justify-between"
                            >

                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">{services.name}</span>

                                  <span className="text-gray-500">-</span>

                                <span className="font-medium text-gray-400">
                                  {formatCurrency((services.price / 100))}
                                </span>
                              </div>

                                <div>
                                  <Button variant="ghost" className="cursor-pointer"
                                  size="icon"
                                  onClick={()=> {}}
                                  >
                                      <Pencil className="w-4 h-4"/>
                                  </Button>

                                   <Button variant="ghost" className="cursor-pointer"
                                  size="icon"
                                  onClick={()=> {handleDeleteService(services.id)}}
                                  >
                                      <X className="w-4 h-4"/>
                                  </Button>
                                </div>

                            </article>
                          ))}
                      </section>
                    </CardContent>

            </Card>

        </section>
       </Dialog>
    )
}