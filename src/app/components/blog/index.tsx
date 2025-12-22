"use client";

import { Post } from "@/app/api/thecave/route";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function Blog() {
  const t = useTranslations();
  const locale = useLocale();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/thecave")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto py-20">
        <div className="text-center text-[#a8a29e]">{t("blog.loading")}</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12">
        <h2 className="text-2xl font-medium mb-4 text-[#f97316]">
          {t("blog.title")}
        </h2>
        <p className="text-[#a8a29e] text-sm leading-relaxed max-w-[50%]">
          {t("blog.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post: Post, index: number) => {
          const date = post.date ? new Date(post.date) : null;
          const formattedDate = date
            ? date.toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "";

          return (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <article className="h-full bg-[#292524] rounded-lg overflow-hidden border border-[#44403c] hover:border-[#f97316] transition-all duration-200 hover:shadow-lg hover:shadow-[#f97316]/10">
                {post.enclosure?.url && (
                  <div className="relative w-full aspect-video overflow-hidden bg-[#1c1917]">
                    <Image
                      src={post.enclosure.url}
                      alt={post.title || "Post Image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6 flex flex-col h-full">
                  <h3 className="text-lg sm:text-xl font-medium text-[#e7e5e4] mb-3 line-clamp-2 group-hover:text-[#f97316] transition-colors">
                    {post.title}
                  </h3>

                  {post.snippet && (
                    <p className="text-sm text-[#a8a29e] mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {post.snippet}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#44403c]">
                    <div className="flex items-center gap-2 text-xs text-[#78716c]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formattedDate}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#78716c] group-hover:text-[#f97316] transition-colors" />
                  </div>
                </div>
              </article>
            </a>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-[#a8a29e]">
          {t("blog.noPosts")}
        </div>
      )}
    </>
  );
}
