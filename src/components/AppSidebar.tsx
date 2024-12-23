import {  Home, LayoutGrid, Shirt, ClipboardMinus, UserRound } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Productos",
    url: "productos",
    icon: Shirt,
  },
  {
    title: "Categorias",
    url: "categorias",
    icon: LayoutGrid,
  },
  {
    title: "Reporte",
    url: "reporte",
    icon: ClipboardMinus,
  },
  {
    title: "Cliente",
    url: "clientes",
    icon: UserRound,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>TAXITEL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
