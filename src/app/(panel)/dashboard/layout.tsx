import { SidebarDashboard } from "./components/sidebar"

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