import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { GuardianArticle } from "@/types"
import type Articles from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function mapGuardianToArticle(g:GuardianArticle):Articles{
  return {
    source:{
      id:"the-guardian",
      name:"the-guardian"
    },
    author: "The Guardian",
    title: g.title,
    description: g.description,
    urlToImage: g.image,
    url: g.apiUrl,
    publishedAt: g.publishedAt,
    content: g.description,
  }
}





