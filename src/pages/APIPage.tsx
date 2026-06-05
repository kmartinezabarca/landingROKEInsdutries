import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Key, Zap, Shield, BookOpen, Terminal, Copy, Check, ExternalLink } from 'lucide-react';

interface ApiEndpoint { method: string; path: string; description: string; response: string; request?: string }
interface CodeExample  { language: string; code: string }

const APIPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints: ApiEndpoint[] = [
    {
      method: 'GET', path: '/api/v1/servers', description: 'Obtener lista de servidores activos y su estado en tiempo real.',
      response: `{\n  "servers": [\n    {\n      "id": "srv_123",\n      "name": "Minecraft Server #1",\n      "status": "online",\n      "players": 15,\n      "max_players": 50,\n      "uptime": "99.8%"\n    }\n  ]\n}`,
    },
    {
      method: 'POST', path: '/api/v1/servers', description: 'Crear y aprovisionar un nuevo servidor de forma automática.',
      request: `{\n  "name": "Mi Servidor",\n  "game": "minecraft",\n  "plan": "premium",\n  "region": "us-east"\n}`,
      response: `{\n  "server": {\n    "id": "srv_456",\n    "name": "Mi Servidor",\n    "status": "creating",\n    "ip": "192.168.1.100",\n    "port": 25565\n  }\n}`,
    },
    {
      method: 'GET', path: '/api/v1/hosting/stats', description: 'Consultar estadísticas de rendimiento del hosting en tiempo real.',
      response: `{\n  "stats": {\n    "cpu_usage": 45.2,\n    "memory_usage": 67.8,\n    "disk_usage": 23.1,\n    "bandwidth": "1.2TB",\n    "uptime": "99.99%"\n  }\n}`,
    },
  ];

  const features = [
    { icon: Zap,      num: '01', title: 'API RESTful',          desc: 'Interfaz REST moderna y fácil de usar con respuestas JSON estándar.' },
    { icon: Shield,   num: '02', title: 'Autenticación Segura', desc: 'Autenticación basada en tokens API con encriptación SSL/TLS.' },
    { icon: Code,     num: '03', title: 'SDKs Disponibles',     desc: 'Librerías oficiales para Python, JavaScript, PHP y más.' },
    { icon: BookOpen, num: '04', title: 'Documentación',        desc: 'Guías detalladas, ejemplos interactivos y referencias completas.' },
  ];

  const codeExamples: CodeExample[] = [
    {
      language: 'JavaScript',
      code: `const response = await fetch('https://api.rokeindustries.com/v1/servers', {\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  }\n});\n\nconst data = await response.json();\nconsole.log(data.servers);`,
    },
    {
      language: 'Python',
      code: `import requests\n\nurl = "https://api.rokeindustries.com/v1/servers"\nheaders = {\n    "Authorization": "Bearer YOUR_API_KEY",\n    "Content-Type": "application/json"\n}\ndata = { "name": "Mi Servidor", "game": "minecraft", "plan": "premium" }\n\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json())`,
    },
    {
      language: 'cURL',
      code: `curl -X GET "https://api.rokeindustries.com/v1/hosting/stats" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"`,
    },
  ];

  const rateLimits = [
    { plan: 'Básico',     requests: '1,000',  unit: 'req/hora' },
    { plan: 'Premium',    requests: '5,000',  unit: 'req/hora' },
    { plan: 'Enterprise', requests: '∞',      unit: 'Sin límite' },
  ];

  const methodColor = (m: string) =>
    m === 'GET'  ? 'border-green-500/40 text-green-600 dark:text-green-400' :
    m === 'POST' ? 'border-blue-500/40 text-blue-600 dark:text-blue-400' :
                   'border-border text-muted-foreground';

  return (
    <div className="min-h-screen bg-background">

      {/* ── Header ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border relative">
        <div className="roke-grid-bg opacity-40" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-6">
              <div className="w-8 h-[1px] bg-muted-foreground" />
              <span>Desarrolladores · API v1</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-end">
              <h1 className="font-sans text-[52px] md:text-[64px] font-bold leading-[0.98] tracking-[-0.035em] text-foreground m-0">
                API de <span className="text-muted-foreground font-medium">ROKE Industries.</span>
              </h1>
              <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[520px] pb-1.5">
                Integra nuestros servicios de hosting y gaming en tus aplicaciones con nuestra API RESTful potente y fácil de usar.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick start ── */}
      <section className="py-[80px] border-b border-border">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-10">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Inicio Rápido</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {/* Step 1 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="p-10 border border-border -m-[1px] bg-card">
              <div className="font-mono text-[11px] text-muted-foreground mb-4">01</div>
              <div className="flex items-center gap-4 mb-5">
                <div className="roke-icon-box w-12 h-12 border border-border flex items-center justify-center text-foreground bg-background">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] font-bold text-foreground tracking-[-0.01em]">Obtén tu API Key</h3>
              </div>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
                Genera tu clave API desde tu panel de control. Cada key otorga acceso completo a los endpoints según tu plan.
              </p>
              <button className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-semibold hover:-translate-y-px hover:shadow-lg transition-all">
                <Key className="w-4 h-4" /> Generar API Key
              </button>
            </motion.div>

            {/* Step 2 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="p-10 border border-border -m-[1px] bg-card">
              <div className="font-mono text-[11px] text-muted-foreground mb-4">02</div>
              <div className="flex items-center gap-4 mb-5">
                <div className="roke-icon-box w-12 h-12 border border-border flex items-center justify-center text-foreground bg-background">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] font-bold text-foreground tracking-[-0.01em]">Haz tu primera llamada</h3>
              </div>
              <p className="text-[13px] text-muted-foreground mb-4">Base URL</p>
              <div className="bg-muted border border-border p-4 font-mono text-[13px] flex items-center justify-between group">
                <code className="text-foreground">https://api.rokeindustries.com/v1</code>
                <button onClick={() => copyToClipboard('https://api.rokeindustries.com/v1', 'base-url')}
                  className="w-7 h-7 border border-border flex items-center justify-center hover:border-foreground/40 transition-colors ml-4 flex-shrink-0">
                  {copiedCode === 'base-url' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-[80px] md:py-[120px] border-b border-border relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-10">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Características</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-9 border border-border -m-[1px] bg-card hover:bg-muted/20 transition-colors flex flex-col gap-5">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground">{f.num}</span>
                    <div className="roke-icon-box w-12 h-12 border border-border flex items-center justify-center text-foreground bg-background">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-[17px] font-bold text-foreground tracking-[-0.01em]">{f.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Endpoints ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border bg-muted/10">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-10">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Endpoints</span>
          </div>
          <div className="border border-border divide-y divide-border">
            {endpoints.map((ep, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 border text-[11px] font-mono ${methodColor(ep.method)}`}>{ep.method}</span>
                  <code className="font-mono text-[13px] bg-muted border border-border px-3 py-1.5 text-foreground">{ep.path}</code>
                </div>
                <p className="text-[14px] text-muted-foreground mb-6">{ep.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ep.request && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] text-muted-foreground">REQUEST BODY</span>
                        <button onClick={() => copyToClipboard(ep.request!, `req-${i}`)}
                          className="w-7 h-7 border border-border flex items-center justify-center hover:border-foreground/40 transition-colors">
                          {copiedCode === `req-${i}` ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                        </button>
                      </div>
                      <pre className="bg-muted border border-border p-4 text-[12px] font-mono text-foreground overflow-x-auto leading-relaxed"><code>{ep.request}</code></pre>
                    </div>
                  )}
                  <div className={ep.request ? '' : 'md:col-span-2'}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] text-muted-foreground">RESPONSE</span>
                      <button onClick={() => copyToClipboard(ep.response, `res-${i}`)}
                        className="w-7 h-7 border border-border flex items-center justify-center hover:border-foreground/40 transition-colors">
                        {copiedCode === `res-${i}` ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                      </button>
                    </div>
                    <pre className="bg-muted border border-border p-4 text-[12px] font-mono text-foreground overflow-x-auto leading-relaxed"><code>{ep.response}</code></pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Code examples ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border relative">
        <div className="roke-slash-bg" />
        <div className="max-w-[1296px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground mb-10">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Ejemplos de Código</span>
          </div>
          <div className="border border-border divide-y divide-border">
            {codeExamples.map((ex, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-foreground/60" />
                    <span className="font-mono text-[13px] font-semibold text-foreground">{ex.language}</span>
                  </div>
                  <button onClick={() => copyToClipboard(ex.code, `code-${i}`)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-border text-[12px] text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors font-mono">
                    {copiedCode === `code-${i}` ? <><Check className="w-3.5 h-3.5" />Copiado</> : <><Copy className="w-3.5 h-3.5" />Copiar</>}
                  </button>
                </div>
                <pre className="bg-muted border border-border p-5 text-[12.5px] font-mono text-foreground overflow-x-auto leading-[1.7]"><code>{ex.code}</code></pre>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rate limits ── */}
      <section className="border-b border-border bg-muted/10">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-foreground py-8 border-b border-border">
            <div className="w-8 h-[1px] bg-muted-foreground" />
            <span>Límites de Velocidad</span>
          </div>
          <div className="grid grid-cols-3 border-r border-border">
            {rateLimits.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="py-10 px-8 border-l border-border">
                <div className="font-mono text-[11px] text-muted-foreground mb-3">{r.plan}</div>
                <div className="text-[48px] font-bold text-foreground leading-none tracking-[-0.04em] mb-1">
                  {r.requests}
                </div>
                <div className="text-[13px] text-muted-foreground font-mono">{r.unit}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-[80px] md:py-[100px] border-b border-border bg-foreground text-background">
        <div className="max-w-[1296px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3.5 font-mono text-[11px] text-background/50 mb-5">
                <div className="w-8 h-[1px] bg-background/40" />
                <span>Recursos</span>
              </div>
              <h3 className="text-[36px] md:text-[44px] font-bold text-background tracking-[-0.03em] leading-tight mb-4">
                ¿Necesitas más <span className="text-background/50 font-medium">información?</span>
              </h3>
              <p className="text-[15px] text-background/60 leading-relaxed max-w-lg">
                Explora nuestra documentación completa, guías de integración y ejemplos avanzados.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="inline-flex items-center gap-2 px-7 py-4 bg-background text-foreground font-semibold text-[14px] hover:-translate-y-px hover:shadow-lg transition-all">
                <BookOpen className="w-4 h-4" /> Documentación completa
              </button>
              <button className="inline-flex items-center gap-2 px-7 py-4 border border-background/30 text-background/80 hover:border-background hover:text-background font-semibold text-[14px] transition-colors">
                <ExternalLink className="w-4 h-4" /> Postman Collection
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APIPage;
