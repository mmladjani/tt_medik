import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContentPageShell } from "@/components/content/content-page-shell";
import { getNewsPosts } from "@/lib/news";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("sr-RS");
}

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <ContentPageShell
      title="Novosti"
      subtitle="Aktuelne informacije, vesti i edukativni sadržaji."
      eyebrow="Blog"
    >
      {posts.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {formatDate(post.publishedAt)}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-600">
                {post.excerpt || "Sadržaj je dostupan na detaljnoj stranici vesti."}
              </p>
              <Link
                href={`/novosti/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700"
              >
                Pročitaj više
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          Novosti još nisu objavljene.
        </p>
      )}
    </ContentPageShell>
  );
}
