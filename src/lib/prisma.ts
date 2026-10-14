import "dotenv/config"
import {PrismaClient} from "../generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg"

const connectionUrl = new URL(`${process.env.DATABASE_URL}`)
const sslMode = connectionUrl.searchParams.get("sslmode")

if (
    connectionUrl.searchParams.get("uselibpqcompat") !== "true" &&
    (sslMode === "prefer" || sslMode === "require" || sslMode === "verify-ca")
) {
    connectionUrl.searchParams.set("sslmode", "verify-full")
}

const connectionString = connectionUrl.toString()

let prisma: PrismaClient;
const adapter = new PrismaPg({ connectionString })

if(process.env.NODE_ENV === "production"){
    prisma = new PrismaClient({ adapter })
}else {
    const globalWithPrisma = global as typeof globalThis & {
        prisma: PrismaClient
    }    
    if(!globalWithPrisma.prisma){
        globalWithPrisma.prisma = new PrismaClient({ adapter })
    }

    prisma = globalWithPrisma.prisma
}

export default prisma