import React from 'react';
import { FaTwitter, FaRegNewspaper } from 'react-icons/fa';

interface SentimentPopupProps {
  text: string;
  source: 'tweet' | 'news';
  isVisible: boolean;
  role?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

export default function SentimentPopup({ text, source, isVisible, role, 'aria-live': ariaLive }: SentimentPopupProps) {
  const icon = source === 'tweet'
    ? <FaTwitter className="text-[#1DA1F2]" />
    : <FaRegNewspaper className="text-text-secondary" />;

  return (
    <div
      className={`absolute transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      } pointer-events-none`}
      role={role}
      aria-live={ariaLive}
    >
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface p-3 shadow-2xl max-w-xs">
        <div className="flex-shrink-0">{icon}</div>
        <p className="text-sm text-text-primary">{text}</p>
      </div>
    </div>
  );
} 