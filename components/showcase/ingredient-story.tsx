'use client';

import React from 'react';
import { MapPin, Award, Leaf, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IngredientSource {
  name: string;
  origin: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  quality: string;
  image: string;
}

const ingredientSources: IngredientSource[] = [
  {
    name: 'Normandy Butter',
    origin: 'Normandy, France',
    description: 'Rich, creamy butter from grass-fed cows in the lush pastures of Normandy.',
    icon: MapPin,
    quality: 'AOC Protected',
    image: '/images/ingredients/normandy-butter.jpg',
  },
  {
    name: 'Organic Flour',
    origin: 'Loire Valley, France',
    description:
      'Stone-ground flour from heritage wheat varieties, preserving tradition and flavor.',
    icon: Leaf,
    quality: 'Organic Certified',
    image: '/images/ingredients/flour.jpg',
  },
  {
    name: 'Guérande Sea Salt',
    origin: 'Brittany, France',
    description: 'Hand-harvested sea salt from the salt marshes of Guérande, known for its purity.',
    icon: Award,
    quality: 'Traditional Harvest',
    image: '/images/ingredients/sea-salt.jpg',
  },
  {
    name: 'Valrhona Chocolate',
    origin: "Tain-l'Hermitage, France",
    description: 'Premium chocolate from the masters of French chocolate making since 1922.',
    icon: Award,
    quality: 'Grand Cru',
    image: '/images/ingredients/chocolate.jpg',
  },
];

interface IngredientStoryProps {
  className?: string;
}

export function IngredientStory({ className }: IngredientStoryProps) {
  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-4">The Source of Excellence</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every ingredient tells a story of tradition, quality, and passion. We source only the
          finest ingredients from their regions of origin in France.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {ingredientSources.map((ingredient, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
                <ingredient.icon className="h-24 w-24 text-primary/30" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {ingredient.quality}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">{ingredient.name}</h3>
                <p className="text-sm opacity-90">{ingredient.origin}</p>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{ingredient.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-serif mb-6">Our Commitment to Quality</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Direct from Source</h4>
                <p className="text-sm text-muted-foreground">
                  We work directly with producers and suppliers in France to ensure authenticity and
                  maintain the highest quality standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Certified Excellence</h4>
                <p className="text-sm text-muted-foreground">
                  Many of our ingredients carry AOC (Appellation d&apos;Origine Contrôlée)
                  protection, guaranteeing their origin and quality.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                <Leaf className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Sustainable Practices</h4>
                <p className="text-sm text-muted-foreground">
                  We prioritize organic and sustainably sourced ingredients whenever possible,
                  supporting responsible farming practices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Traditional Methods</h4>
                <p className="text-sm text-muted-foreground">
                  Our ingredients are processed using traditional methods that have been perfected
                  over centuries, preserving their natural flavors.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-secondary/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4">The French Difference</h4>
                <p className="text-muted-foreground mb-4">
                  &ldquo;In France, we don&apos;t just bake—we create. Every ingredient must honor
                  the tradition and express the terroir from which it comes.&rdquo;
                </p>
                <cite className="text-sm text-primary font-medium">
                  — Yvan Lemoine, Master Baker
                </cite>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Quality Guarantees</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">100% French imported ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">No artificial preservatives</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Traditional production methods</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Freshly baked daily</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
