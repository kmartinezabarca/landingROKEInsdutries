/* Render smoke test (no browser): renderiza los componentes/páginas
   refactorizados con react-dom/server dentro de los providers reales y
   verifica que no lancen errores en el render inicial.
   Ejecutar con: vite-node scripts/smoke.tsx */
import { JSDOM } from 'jsdom';

// ── DOM globals antes de importar cualquier componente ──
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
const w = dom.window as any;
w.matchMedia = () => ({
  matches: false, media: '', onchange: null,
  addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; },
});
(globalThis as any).window = w;
(globalThis as any).document = w.document;
(globalThis as any).localStorage = w.localStorage;
(globalThis as any).HTMLElement = w.HTMLElement;
(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(0), 0);
(globalThis as any).cancelAnimationFrame = (id: number) => clearTimeout(id);
try { Object.defineProperty(globalThis, 'navigator', { value: w.navigator, configurable: true }); } catch { /* read-only en node, ok */ }

// ── Imports dinámicos (después de preparar el DOM) ──
const React = (await import('react')).default;
const { renderToString } = await import('react-dom/server');
const { MemoryRouter } = await import('react-router-dom');
const { QueryClient, QueryClientProvider } = await import('@tanstack/react-query');
const { ThemeProvider } = await import('@/contexts/ThemeContext');
const { AuthProvider } = await import('@/contexts/AuthContext');
const { CheckoutProvider } = await import('@/contexts/CheckoutContext');

const ServicesPage = (await import('@/pages/ServicesPage')).default;
const HostingPage = (await import('@/pages/HostingPage')).default;
const BlogPage = (await import('@/pages/BlogPage')).default;
const BlogDetailPage = (await import('@/pages/BlogDetailPage')).default;
const Pricing = (await import('@/components/sections/Pricing')).default;
const RelatedCard = (await import('@/pages/blog/RelatedCard')).default;
const FeaturedCard = (await import('@/pages/blog/FeaturedCard')).default;
const PostCard = (await import('@/pages/blog/PostCard')).default;
const NewsletterBand = (await import('@/pages/blog/NewsletterBand')).default;

const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const fmt = (d?: string) => d || '';
const post: any = {
  uuid: '1', slug: 'demo', title: 'Demo post', excerpt: 'Lorem ipsum',
  image: '', category: { name: 'Cloud', uuid: 'c1' }, readTime: 5,
  publishedAt: '2026-01-01', authorName: 'ROKE',
};

function Providers({ children, route = '/' }: { children: React.ReactNode; route?: string }) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={qc}>
        <AuthProvider><CheckoutProvider><ThemeProvider>{children}</ThemeProvider></CheckoutProvider></AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}

const cases: Array<[string, React.ReactElement, string?]> = [
  ['ServicesPage', <ServicesPage />, '/services'],
  ['HostingPage', <HostingPage />, '/hosting'],
  ['BlogPage', <BlogPage />, '/blog'],
  ['BlogDetailPage', <BlogDetailPage />, '/blog/demo'],
  ['Pricing (section)', <Pricing />, '/'],
  ['RelatedCard', <RelatedCard rel={post} relAuthor="ROKE" idx={0} total={3} />],
  ['FeaturedCard', <FeaturedCard post={post} formatDate={fmt} />],
  ['PostCard', <PostCard post={post} index={0} formatDate={fmt} />],
  ['NewsletterBand', <NewsletterBand />],
];

let pass = 0, fail = 0;
for (const [name, el, route] of cases) {
  try {
    const html = renderToString(<Providers route={route}>{el}</Providers>);
    if (!html || html.length < 10) throw new Error('render vacío');
    console.log(`PASS  ${name}  (${html.length} bytes)`);
    pass++;
  } catch (e: any) {
    console.log(`FAIL  ${name}  -> ${e?.message ?? e}`);
    fail++;
  }
}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
