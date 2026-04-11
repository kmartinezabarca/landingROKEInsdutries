/**
 * Tipos globales de la API de ROKE Industries
 * Refleja la estructura de respuesta del backend Laravel
 */

// ---------------------------------------------------------------------------
// Envoltura genérica de respuesta
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  uuid: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  is_featured: boolean;
  isFeatured: boolean;
  published_at: string;
  publishedAt: string;
  read_time: number | null;
  readTime: number | null;
  category: BlogCategory | null;
  author_name: string | null;
  authorName: string | null;
  author?: { name: string };
}

export interface BlogPostsParams {
  search?: string;
  category_id?: string;
  page?: number;
}

// ---------------------------------------------------------------------------
// Marketing Services
// ---------------------------------------------------------------------------

export interface MarketingService {
  uuid: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  slug: string;
  is_active: boolean;
  isActive: boolean;
}

// ---------------------------------------------------------------------------
// Service Plans
// ---------------------------------------------------------------------------

export interface ServicePlan {
  uuid: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  category_id: string;
  categoryId: string;
  billing_cycle_id: string;
  billingCycleId: string;
  is_popular: boolean;
  isPopular: boolean;
  is_active: boolean;
  isActive: boolean;
}

// ---------------------------------------------------------------------------
// Billing Cycles
// ---------------------------------------------------------------------------

export interface BillingCycle {
  id: number;
  name: string;
  months: number;
  discount: number;
  label: string;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export interface Category {
  uuid: string;
  name: string;
  slug: string;
}

// ---------------------------------------------------------------------------
// Documentation
// ---------------------------------------------------------------------------

export interface Documentation {
  uuid: string;
  title: string;
  slug: string;
  content: string;
  updated_at: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// User Requests
// ---------------------------------------------------------------------------

export type UserRequestKind =
  | 'contact'
  | 'documentation_request'
  | 'api_documentation_request'
  | 'blog_subscription';

export interface UserRequestPayload {
  name: string;
  email: string;
  topic: string;
  description?: string;
  kind: UserRequestKind;
  phone?: string;
  company?: string;
}

// ---------------------------------------------------------------------------
// System Status
// ---------------------------------------------------------------------------

export type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface SystemService {
  uuid: string;
  name: string;
  status: ServiceStatus;
  description?: string;
}
