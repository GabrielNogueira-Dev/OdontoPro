import { getInfoSchedule } from "./_data-access/get-info-schadule"


export default async function SchedulePage({
    params,
}: {
    params: Promise<{id:string}>
}){

    const userId = (await params).id
    const user = await getInfoSchedule({userId:userId})

    return(
        <h1>{user?.id}</h1>
    )
}