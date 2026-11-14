import { getInfoSchedule } from "./_data-access/get-info-schadule"
import { ScheduleContent } from "@/app/(public)/clinica/[id]/_components/schedule-content"
import { notFound } from "next/navigation"

export default async function SchedulePage({
    params,
}: {
    params: Promise<{id:string}>
}){

    const userId = (await params).id
    const user = await getInfoSchedule({userId:userId})

    if (!user) {
        notFound()
    }

    return(
        <ScheduleContent clinic={user}/>
    )
}