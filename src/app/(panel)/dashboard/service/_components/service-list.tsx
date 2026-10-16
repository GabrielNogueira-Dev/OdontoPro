"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,DialogClose,
  DialogContent,DialogDescription,
  DialogFooter,DialogHeader,
  DialogTitle,DialogTrigger} from "@/components/ui/dialog"

  import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle
  } from "@/components/ui/card"

import { useState } from "react"
import { Plus } from "lucide-react"
import { DialogService } from "./dialog-services"

export function ServicesList(){

    const [isDialogOpen,setIsDialogOpen] = useState(false);
    

    return(
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <section className="mx-auto">
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer">
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </DialogTrigger>

                        <DialogContent>
                          <DialogService/>
                        </DialogContent>

                </CardHeader>
            </Card>

        </section>
       </Dialog>
    )
}