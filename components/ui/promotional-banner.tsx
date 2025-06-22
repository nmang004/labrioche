'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils/cn';
import { Promotion } from '@/types';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface PromotionalBannerProps {
  promotion: Promotion;
  onDismiss?: (promotionId: string) => void;
  className?: string;
}

export function PromotionalBanner({ 
  promotion, 
  onDismiss, 
  className 
}: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if promotion has been dismissed in localStorage
    const dismissedPromotions = JSON.parse(
      localStorage.getItem('dismissed-promotions') || '[]'
    );
    
    if (dismissedPromotions.includes(promotion._id)) {
      setIsVisible(false);
    }
  }, [promotion._id]);

  const handleDismiss = () => {
    setIsAnimating(true);
    
    // Save dismissal to localStorage
    const dismissedPromotions = JSON.parse(
      localStorage.getItem('dismissed-promotions') || '[]'
    );
    
    if (!dismissedPromotions.includes(promotion._id)) {
      dismissedPromotions.push(promotion._id);
      localStorage.setItem('dismissed-promotions', JSON.stringify(dismissedPromotions));
    }
    
    // Animate out
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.(promotion._id);
    }, 300);
  };

  const handleClick = () => {
    if (promotion.link) {
      // Track click event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'promotion_click', {
          promotion_id: promotion._id,
          promotion_title: promotion.title,
        });
      }
      
      // Open link
      if (promotion.link.startsWith('http')) {
        window.open(promotion.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = promotion.link;
      }
    }
  };

  const getBackgroundColor = () => {
    switch (promotion.backgroundColor) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'accent':
        return 'bg-yellow-500 text-white';
      case 'warning':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'relative w-full transition-all duration-300 ease-in-out',
        getBackgroundColor(),
        isAnimating && 'opacity-0 transform -translate-y-full',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-1">
              <h3 className="font-semibold text-sm md:text-base">
                {promotion.title}
              </h3>
              <p className="text-xs md:text-sm opacity-90 mt-1">
                {promotion.content}
              </p>
            </div>
            
            {promotion.link && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClick}
                className="text-current hover:bg-white/10 gap-1"
              >
                Learn More
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-current hover:bg-white/10 p-1 h-auto ml-2"
            aria-label="Dismiss promotion"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface PromotionalBannerContainerProps {
  promotions: Promotion[];
  className?: string;
}

export function PromotionalBannerContainer({ 
  promotions, 
  className 
}: PromotionalBannerContainerProps) {
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    // Filter active promotions based on date
    const now = new Date();
    const active = promotions.filter(promotion => {
      const startDate = promotion.startDate ? new Date(promotion.startDate) : null;
      const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
      
      if (startDate && startDate > now) return false;
      if (endDate && endDate < now) return false;
      
      return true;
    });
    
    setActivePromotions(active);
  }, [promotions]);

  const handleDismiss = (promotionId: string) => {
    setActivePromotions(prev => prev.filter(p => p._id !== promotionId));
  };

  if (activePromotions.length === 0) return null;

  return (
    <div className={cn('space-y-0', className)}>
      {activePromotions.map((promotion, index) => (
        <PromotionalBanner
          key={promotion._id}
          promotion={promotion}
          onDismiss={handleDismiss}
          className={index > 0 ? 'border-t border-white/20' : ''}
        />
      ))}
    </div>
  );
}