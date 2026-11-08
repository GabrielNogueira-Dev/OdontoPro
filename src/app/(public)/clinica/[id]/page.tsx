import { getInfoSchedule } from "./_data-access/get-info-schadule"
import { ScheduleContent } from "@/app/(public)/clinica/[id]/_components/schedule-content"   

export default async function SchedulePage({
    params,
}: {
    params: Promise<{id:string}>
}){

    const userId = (await params).id
    const user = await getInfoSchedule({userId:userId})

    return(
        <ScheduleContent user={user}/>
    )
}