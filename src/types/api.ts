// ─── Generic API wrapper ───────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// ─── Services ──────────────────────────────────────────────────────────
export interface SystemService {
  id: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
  bgColor: string;
  features: string[];
  type: 'main' | 'additional';
  slug: string;
}

// ─── Blog ──────────────────────────────────────────────────────────────
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  imageUrl?: string;
  readTime?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

// ─── Hosting / Plans ───────────────────────────────────────────────────
export interface ServicePlan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: string;
  features: string[];
  isPopular?: boolean;
  category?: string;
  slug?: string;
}

export interface BillingCycle {
  id: number;
  name: string;
  label: string;
  multiplier: number;
  discount?: number;
}

// ─── Documentation ─────────────────────────────────────────────────────
export interface Documentation {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  order?: number;
}

// ─── Contact / Forms ───────────────────────────────────────────────────
export type UserRequestKind =
  | 'hosting'
  | 'gaming'
  | 'development'
  | 'consulting'
  | 'support'
  | 'other';

export interface UserRequestPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: UserRequestKind;
  message: string;
}
