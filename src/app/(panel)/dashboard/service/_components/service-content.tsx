import { getAllServices } from "../_data_access/get-all-services"
import { ServicesList } from "./service-list"

interface ServiceContentProps{
    userId: string
}

export async function  ServicesContent({userId}: ServiceContentProps) {
    
    const services = await getAllServices({userId: userId})

        console.log(services)

    return(
        <div><ServicesList/></div>
    )
}