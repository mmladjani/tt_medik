import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContentPageShell } from "@/components/content/content-page-shell";
import { RichContent } from "@/components/content/rich-content";
import { getNewsPostBySlug } from "@/lib/news";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("sr-RS");
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <ContentPageShell
      title={post.title}
      subtitle={formatDate(post.publishedAt)}
      eyebrow="Novosti"
    >
      <article className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-8">
        {post.excerpt ? (
          <p className="mb-6 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
        ) : null}
        <RichContent portableText={post.bodyPortableText} textContent={post.bodyText} />
      </article>

      <div className="mt-6">
        <Link
          href="/novosti"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
        >
          <ArrowLeft className="size-4" />
          Nazad na novosti
        </Link>
      </div>
    </ContentPageShell>
  );
}
