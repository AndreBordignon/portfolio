// pages/api/thecave.js
import Parser from "rss-parser";
import type { NextApiRequest, NextApiResponse } from "next";


interface Enclosure {
  url: string;
  type: string;
  length: string;
}
export interface Post {
  title: string | undefined;
  link: string | undefined;
  date: string | undefined;
  snippet: string | undefined;
  enclosure: Enclosure | undefined;
}

interface ErrorResponse {
  error: string;
}

export async function GET(req: Request): Promise<Response> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(
      "https://andrebordignon.substack.com/feed"
    ); // link do feed da sua newsletter
    
    const posts: Post[] = feed.items
      .map((item) => ({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        snippet: item.contentSnippet,
        enclosure: item.enclosure
          ? {
              url: item.enclosure.url ?? "",
              type: item.enclosure.type ?? "",
              length: String(item.enclosure.length ?? "")
            }
          : undefined
      }))
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao carregar feed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
