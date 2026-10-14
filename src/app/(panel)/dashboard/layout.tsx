import { SidebarDashboard } from "./_components/sidebar"

export default function DashboadLayout({
    children,
}: {
    children: React.ReactNode
}){
    return(
        <>
        <SidebarDashboard>
             {children}
        </SidebarDashboard>
        </>
    )
}