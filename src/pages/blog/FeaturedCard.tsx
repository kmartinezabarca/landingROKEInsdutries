import React from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogListPost } from "./types";

interface FeaturedCardProps {
  post: BlogListPost;
  formatDate: (d?: string) => string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ post, formatDate }) => {
  const authorName = post.authorName || post.author?.name || "ROKE Industries";
  const initials = authorName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid overflow-hidden group"
      style={{
        gridTemplateColumns: '1.4fr 1fr',
        border: '1px solid var(--roke-border-strong)',
        background: 'var(--roke-surface)',
      }}
    >
      {/* Left: image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/3', background: 'var(--roke-surface-2)' }}
      >
        {post.image ? (
          <img
            src={post.image} alt={post.title}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, var(--roke-surface-2) 0%, var(--roke-bg) 100%)',
            }}
          />
        )}
        <div
          className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 z-10"
          style={{ background: 'var(--roke-text)', color: 'var(--roke-bg)' }}
        >
          Destacado
        </div>
      </div>

      {/* Right: body */}
      <div
        className="flex flex-col justify-between gap-6"
        style={{ padding: '44px 44px 36px' }}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span
                className="font-mono text-[10.5px] tracking-[0.1em] uppercase px-2.5 py-1"
                style={{ color: 'var(--roke-text)', border: '1px solid var(--roke-border-strong)' }}
              >
                {post.category.name}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: 'var(--roke-text-dimmer)' }}>
              <Clock className="w-3 h-3" />{post.readTime || 5} min de lectura
            </span>
          </div>
          <h2
            className="font-bold leading-[1.05] tracking-[-0.025em] mb-[18px]"
            style={{ fontSize: '38px', color: 'var(--roke-text)' }}
          >
            {post.title}
          </h2>
          <p
            className="text-[16px] leading-[1.55] line-clamp-3"
            style={{ color: 'var(--roke-text-dim)' }}
          >
            {post.excerpt}
          </p>
        </div>

        <div
          className="flex items-center justify-between pt-5 mt-auto"
          style={{ borderTop: '1px solid var(--roke-border)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px]"
              style={{
                background: 'var(--roke-surface-2)',
                border: '1px solid var(--roke-border-strong)',
                color: 'var(--roke-text)',
              }}
            >
              {initials}
            </div>
            <div className="flex flex-col leading-[1.2]">
              <span className="font-semibold text-[13px]" style={{ color: 'var(--roke-text)' }}>{authorName}</span>
              <span className="font-mono text-[10.5px] tracking-[0.05em] mt-0.5" style={{ color: 'var(--roke-text-dimmer)' }}>
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-[13px] tracking-[0.04em] uppercase group/link"
            style={{ color: 'var(--roke-text)', textDecoration: 'none' }}
          >
            Leer artículo
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default FeaturedCard;
