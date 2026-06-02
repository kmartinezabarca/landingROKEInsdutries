import React from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogListPost } from "./types";

interface PostCardProps {
  post: BlogListPost;
  index: number;
  formatDate: (d?: string) => string;
}

const PostCard: React.FC<PostCardProps> = ({ post, index, formatDate }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
    className="-m-px flex flex-col group"
    style={{
      border: '1px solid var(--roke-border-strong)',
      background: 'var(--roke-surface)',
      transition: 'background 0.18s ease',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = 'var(--roke-surface-2)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'var(--roke-surface)')}
  >
    <Link to={`/blog/${post.slug}`} className="flex flex-col flex-1" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Media */}
      <div
        className="overflow-hidden relative"
        style={{
          aspectRatio: '16/10',
          background: 'var(--roke-surface-2)',
          borderBottom: '1px solid var(--roke-border)',
        }}
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
            style={{ background: 'linear-gradient(135deg, var(--roke-surface-2) 0%, var(--roke-bg) 100%)' }}
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3.5 flex-1" style={{ padding: '22px 24px 24px' }}>
        <div className="flex items-center gap-3">
          {post.category && (
            <span
              className="font-mono text-[10.5px] tracking-[0.1em] uppercase px-2.5 py-1"
              style={{ color: 'var(--roke-text)', border: '1px solid var(--roke-border-strong)' }}
            >
              {post.category.name}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: 'var(--roke-text-dimmer)' }}>
            <Clock className="w-2.5 h-2.5" />{post.readTime || 5} min
          </span>
        </div>
        <h3
          className="font-bold leading-[1.15] tracking-[-0.015em] line-clamp-2"
          style={{ fontSize: '21px', color: 'var(--roke-text)', margin: 0 }}
        >
          {post.title}
        </h3>
        <p
          className="text-[14px] leading-[1.5] flex-1"
          style={{
            color: 'var(--roke-text-dim)', margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>
        <div
          className="flex items-center justify-between pt-3.5 mt-auto font-mono text-[11px] tracking-[0.04em]"
          style={{ borderTop: '1px solid var(--roke-border)', color: 'var(--roke-text-dimmer)' }}
        >
          <span>{formatDate(post.publishedAt)}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--roke-text)' }} />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default PostCard;
