import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { DEFAULT_IMAGE } from './blogUtils';
import type { RelatedArticle } from './types';

interface RelatedCardProps {
  rel: RelatedArticle;
  relAuthor: string;
  idx: number;
  total: number;
}

const RelatedCard: React.FC<RelatedCardProps> = ({ rel, relAuthor, idx }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link key={rel.uuid} to={`/blog/${rel.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        borderLeft: idx > 0 ? '1px solid var(--roke-border-strong)' : 'none',
        background: hovered ? 'var(--roke-surface-2)' : 'transparent',
        transition: 'background 0.15s',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: 'var(--roke-surface-2)' }}>
        <img src={rel.image || DEFAULT_IMAGE} alt={rel.title}
          onError={e => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }} />
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 28px' }}>
        {rel.category && (
          <div style={{
            fontSize: 10, fontFamily: '"JetBrains Mono", monospace',
            color: 'var(--roke-text-dimmer)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            {rel.category.name}
          </div>
        )}
        <h4 style={{
          fontFamily: '"Montserrat", sans-serif', fontSize: 16,
          fontWeight: 700, color: 'var(--roke-text)', lineHeight: 1.3,
          letterSpacing: '-0.015em', marginBottom: 10,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {rel.title}
        </h4>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
          color: 'var(--roke-text-dimmer)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock className="w-3 h-3" /> {rel.readTime || 5} min
          </span>
          <span style={{ color: 'var(--roke-border-stronger)' }}>·</span>
          <span>{relAuthor}</span>
        </div>
      </div>
    </Link>
  );
};

export default RelatedCard;
