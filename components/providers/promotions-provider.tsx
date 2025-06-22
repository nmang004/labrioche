'use client';

import { PromotionalBannerContainer } from '@/components/ui/promotional-banner';
import { usePromotions } from '@/lib/hooks/use-promotions';

export function PromotionsProvider() {
  const { promotions, loading } = usePromotions();

  if (loading || promotions.length === 0) {
    return null;
  }

  return <PromotionalBannerContainer promotions={promotions} />;
}