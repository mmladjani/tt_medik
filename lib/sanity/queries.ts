import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    primaryPhone,
    secondaryPhones,
    email,
    address
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroTitle,
    heroSubtitle,
    "heroImageUrl": heroImage.asset->url,
    quickLinks[]{
      title,
      description,
      linkLabel,
      linkUrl
    },
    aboutTitle,
    aboutBody,
    "programCards": programCards[]->{
      title,
      description,
      "slug": slug.current
    },
    "faqItems": faqItems[]->{
      question,
      answer,
      order
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    contentPortableText,
    seo,
    _updatedAt
  }
`;

export const newsPostsQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    bodyPortableText,
    publishedAt,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const newsPostBySlugQuery = groq`
  *[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    bodyPortableText,
    publishedAt,
    "coverImageUrl": coverImage.asset->url
  }
`;
