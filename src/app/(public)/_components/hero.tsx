import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../public/doctor-hero.png"

export function Hero() {

    return(
        <section className = "">
            <div className = "container mx-auto px-4 pt-20 sm:px-6 lg:px-8">

                <main className = "flex items-center justify-center">
                    <article className = "flex-2 space-y-8 max-w-3xl flex flex-col justify-center">
                        <h1 className = "text-4xl lg:text-5xl font-bold max-w-2xl">
                            Encontre os melhores profissionais em um só lugar.
                        </h1>
                        <p className = "text-base md:text-lg text-gray-600">
                            Nós conectamos você com os melhores profissionais para atender às suas necessidades,
                             garantindo qualidade e confiança em cada serviço prestado.
                        </p>

                        <Button className = "w-fit bg-emerald-500 hover:bg-emerald-400 m-4 cursor-pointer font-bold">
                            Encontre sua clínica
                        </Button>
                    </article>

                    <div className = "hidden lg:block">
                        <Image
                        src = {doctorImg}  alt = "Imagem de um médico sorrindo"
                        width = {340}
                        height = {400}
                        className = "object-contain" quality = {100} priority
                        />
                    </div>
                    
                </main>
            </div>
        </section>
    )
}