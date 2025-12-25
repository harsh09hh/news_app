import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ParticularGuardianArticle } from "@/api/v1/Guardianarticle";
import { analyzeArticle } from "@/api/v1/analyze";

import "@/app.css";

import type { GuardianContent } from "@/types";
import type Articles from "@/types";


function mapGuardianToArticle(guardian: GuardianContent): Articles {
  return {
    source: {
      id: "the-guardian",
      name: "The Guardian",
    },
    author: "The Guardian",
    title: guardian.fields?.headline ?? guardian.webTitle,
    description: guardian.fields?.trailText ?? "",
    urlToImage: guardian.fields?.thumbnail,
    url: guardian.webUrl,
    publishedAt: guardian.webPublicationDate,
    content: guardian.fields?.body ?? "",
  };
}

interface AIresponse {
  ai_summary: string[];
  leaning: string[];
  source_Reliability: string[];
  ai_key_points: string[];
  ai_Sentiment: string[];
}

const OnclicknewsGuardian = () => {

  const { state } = useLocation();

  const [guardianArticle, setGuardianArticle] =
    useState<GuardianContent | null>(null);

  const [aiData, setAiData] = useState<AIresponse | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    if (!state?.apiUrl) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        const res = await ParticularGuardianArticle(state.apiUrl);
        if (!cancelled) setGuardianArticle(res.article);
      } catch {
        if (!cancelled) setError("Failed to load article");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [state?.apiUrl]);


  useEffect(() => {
    if (!guardianArticle) return;

    let cancelled = false;
    const articleForAI = mapGuardianToArticle(guardianArticle);

    (async () => {
      try {
        const data = await analyzeArticle(articleForAI);
        if (!cancelled) setAiData(data);
      } catch {
        if (!cancelled) setAiUnavailable(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [guardianArticle]);


  if (!state?.apiUrl) {
    return <div className="p-6">No article data found.</div>;
  }

  if (isLoading) return <div className="p-6">Loading article…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!guardianArticle) return <div className="p-6">Article not available.</div>;

  return (
    <main className="bg-white min-h-screen">


      <article className="mx-auto max-w-[720px] px-4 pt-10">
        <h1 className="font-serif text-[42px] leading-tight font-bold">
          {guardianArticle.fields?.headline}
        </h1>

        {guardianArticle.fields?.trailText && (
          <p className="mt-4 text-xl text-gray-700 font-serif">
            {guardianArticle.fields.trailText}
          </p>
        )}

        <div className="mt-6 text-sm text-gray-500">
          The Guardian •{" "}
          {new Date(guardianArticle.webPublicationDate).toDateString()}
        </div>
      </article>

  

      {guardianArticle.fields?.thumbnail && (
        <section className="my-12">
          <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2">
            <img
              src={guardianArticle.fields.thumbnail}
              alt={guardianArticle.webTitle}
              className="w-full max-h-[650px] object-cover"
            />
          </div>
        </section>
      )}



      <article className="mx-auto max-w-[720px] px-4 pb-24">
        <div
          className="article-body"
          dangerouslySetInnerHTML={{
            __html: guardianArticle.fields?.body ?? "",
          }}
        />



        <section className="mt-16 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>

          {aiData ? (
            <div className="space-y-2">
              <p><b>Leaning:</b> {aiData.leaning.join(", ")}</p>
              <p><b>Sentiment:</b> {aiData.ai_Sentiment.join(", ")}</p>
            </div>
          ) : aiUnavailable ? (
            <p className="text-gray-500 italic">
              AI analysis is not available for this article.
            </p>
          ) : (
            <p className="text-gray-500">Analyzing article…</p>
          )}
        </section>
      </article>
    </main>
  );
};

export default OnclicknewsGuardian;
