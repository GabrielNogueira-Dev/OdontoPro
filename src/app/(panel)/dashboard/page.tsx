import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getUserData } from "@/app/(panel)/profile/_DATA_ACCESS/get-info-user"

export default async function Dashboard() {
    const session = await getSession();
    
    if(!session) {
        redirect("/")
    }

    const userData = await getUserData({userId: session.user.id})
console.log(userData)
    if(!userData){
        redirect("/")
    }

    return(
        <div>
            <h1>
                Ola dashboard
            </h1>
        </div>
    )
}