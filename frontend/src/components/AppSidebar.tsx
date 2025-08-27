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
 

export function AppSidebar() {
  
   const navigate =useNavigate();
  return (
    <Sidebar>
     <SidebarContent>
        <SidebarHeader>
            <div className="flex items-center gap-2 text-xl font-bold">
            <Newspaper className=" text-blue-500"/>
            <span>NewsHub</span>
            </div>
            <SidebarInput placeholder="search news"/>
        </SidebarHeader>

        <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#">
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
                  <a href="#">
                    <Globe />
                    <span>World</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={()=>{
                  navigate('/politics')
                }}>
                  <a href="#">
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
                  <a href="#">
                    <Newspaper />
                    <span>Times Of India</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Newspaper />
                    <span>The Hindu</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
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