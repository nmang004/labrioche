'use client';

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity/client';
import { ACTIVE_PROMOTIONS_QUERY } from '@/lib/sanity/queries';
import { Promotion } from '@/types';

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPromotions() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await sanityClient.fetch(ACTIVE_PROMOTIONS_QUERY);
        setPromotions(data || []);
      } catch (err) {
        console.error('Error fetching promotions:', err);
        setError('Failed to load promotions');
      } finally {
        setLoading(false);
      }
    }

    fetchPromotions();
  }, []);

  const refetchPromotions = async () => {
    try {
      setLoading(true);
      const data = await sanityClient.fetch(ACTIVE_PROMOTIONS_QUERY);
      setPromotions(data || []);
    } catch (err) {
      console.error('Error refetching promotions:', err);
      setError('Failed to reload promotions');
    } finally {
      setLoading(false);
    }
  };

  return {
    promotions,
    loading,
    error,
    refetchPromotions,
  };
}