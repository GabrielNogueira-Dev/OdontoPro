

import prisma from "@/lib/prisma"

interface GetUserDataProps{
    userId:string;
}

export async function getUserData({userId}:GetUserDataProps){
try{

    if(!userId){
        return null;
    }

    const getUser = await prisma.user.findFirst({
        where:{
            id: userId
        },
        include:{
            subscription: true,
        }
    })

    if(!getUser){
        return null;
    }

return getUser
}catch(err){
    console.log(err)
    return null
}
}