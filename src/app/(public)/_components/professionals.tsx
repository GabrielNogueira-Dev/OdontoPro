import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import fotoImg from "../../../../public/foto1.png"
import Link from "next/link";

export function Professionals() {

    return(
        <section className = "bg-gray-50 py-16">
           
        <div className = "container mx-auto px-4 sm:px-6 lg:px-8">
             <h2 className = "font-semibold text-3xl text-center mb-12">
                Clínicas disponíveis
            </h2>

        <section className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            
            <Card className = "overflow-hidden">
                <CardContent className = "p-0">
                     {/* img */}
                    <div>
                        <div className="relative h-48">
                    <Image src={fotoImg} alt="foto" fill className="object-cover" quality={100} />
                    </div>

                    </div>
                        {/* endereço */}
                    <div className = " p-4 space-y-4">
                        <div className = "flex items-center justify-between">
                           <div>
                            <h3 className = "text-sm text-gray-500 font-semibold">
                                clínica D´Villa
                            </h3>
                            <p>
                                Rua z, 123 - Centro, Braga
                            </p>
                        </div>

                        <div className = "w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    </div>

                    <Link href = "/clinica/123"
                     className = " w-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center py-2 rounded-b-md text-sm md:text-base font-medium" 
                     >Acessar Clínica
                    </Link>

                    </div>
                </CardContent>
            </Card>

        </section>

        </div>

        </section>
    )
}