import type Articles from "@/types";

export interface AIResponse {
  ai_summary: string[];
  leaning: string[];
  source_Reliability: string[];
  ai_key_points: string[];
  ai_Sentiment: string[];
}


export async function analyzeArticle(article: Articles): Promise<AIResponse> {
  const response = await fetch("http://localhost:3001/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(article)
  });

  if (!response.ok) {
    throw new Error("Failed to analyze article");
  }

  return await response.json();
}
