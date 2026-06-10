export interface ArticleCategory {
  name: string;
  uuid?: string;
}

export interface Article {
  title: string;
  excerpt?: string;
  content: string;
  image?: string;
  publishedAt?: string;
  readTime?: number;
  likes?: number;
  slug: string;
  category?: ArticleCategory;
  authorName?: string;
  author?: { name: string };
  views?: number;
  commentsCount?: number;
}

export interface RelatedArticle {
  uuid: string;
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  readTime?: number;
  category?: ArticleCategory;
  authorName?: string;
  author?: { name: string };
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Post tal como lo muestra el listado del blog (BlogPage). */
export interface BlogListPost {
  uuid: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  isFeatured?: boolean;
  category?: { name: string; uuid?: string };
  readTime?: number;
  publishedAt?: string;
  authorName?: string;
  author?: { name: string };
}
