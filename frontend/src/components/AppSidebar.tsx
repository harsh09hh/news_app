 import {
  Newspaper,
  TrendingUp,
  Clock,
  Trophy,
  DollarSign,
  Monitor,
  Globe,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInput
} from "@/components/ui/sidebar"

import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
 const { open,setOpen } = useSidebar();
  
   const navigate =useNavigate();
  return (
    <Sidebar collapsible="offcanvas">
     <SidebarContent>
        <SidebarHeader>
            <div className="flex items-center justify-between text-xl font-bold w-full">
            <div  className="flex items-center gap-2">
            <Newspaper className=" text-blue-500"/>
            <a href="/">
              <span>The Daily Draft</span>
              </a>
              </div>
              
              <button className="lg:hidden p-2 rounded-md border"
                onClick={()=>setOpen(!open)}
              ><Menu/></button>
            
            
            </div>
            <SidebarInput placeholder="search news"/>
        </SidebarHeader>

        <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/latest">
                                <Clock/>
                                <span>Latest News</span>
                            </a>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/trending">
                               <TrendingUp/>
                               <span>Trending</span>
                            </a>
                        </SidebarMenuButton>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>CATEGORIES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={()=>
                  navigate('/sports')

                }>
                  <a >
                    <Trophy />
                    <span>Sports</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={()=>{
                  navigate('/fintech')
                }}>
                  <a>
                    <DollarSign />
                    <span>Fintech</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={()=>{
                  navigate('/technology')
                }}>
                  <a>
                    <Monitor />
                    <span>Technology</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a >
                    <Globe />
                    <span>World</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={()=>{
                  navigate('/politics')
                }}>
                  <a >
                    <Users />
                    <span>Politics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        <SidebarGroup>
          <SidebarGroupLabel>Local</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a >
                    <Newspaper />
                    <span>Times Of India</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a >
                    <Newspaper />
                    <span>The Hindu</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a >
                    <Newspaper />
                    <span className="font-serif">Ndtv-News</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
             
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>








         <SidebarGroup>
          <SidebarGroupLabel>Global</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Newspaper />
                    <span>New york Times</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Newspaper />
                    <span>Washington-Post</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Newspaper />
                    <span className="font-serif">NBC</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Newspaper />
                    <span className="font-serif">Wall-Street-Journal</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
             
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        


     </SidebarContent>
    </Sidebar>
  )
}