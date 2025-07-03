'use client';

import React from 'react';
import { Clock, Thermometer, Wheat, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

const bakingSteps: ProcessStep[] = [
  {
    id: '1',
    title: 'Selection & Preparation',
    description:
      'We carefully select and prepare only the finest ingredients, imported directly from France.',
    time: '2:00 AM',
    icon: Wheat,
    details: [
      'French butter churned from Normandy cream',
      'Organic flour from traditional mills',
      'Sea salt from Guérande',
      'Natural yeast starters maintained daily',
    ],
  },
  {
    id: '2',
    title: 'Dough Creation',
    description:
      'Each dough is mixed by hand using traditional techniques passed down through generations.',
    time: '3:00 AM',
    icon: Sparkles,
    details: [
      'Hand-mixed for optimal texture',
      'Precise temperature control',
      'Traditional folding techniques',
      'Proper fermentation timing',
    ],
  },
  {
    id: '3',
    title: 'Lamination Process',
    description:
      'For croissants and pastries, we perform the delicate lamination process to create perfect layers.',
    time: '4:00 AM',
    icon: Thermometer,
    details: [
      '81 layers for classic croissants',
      'Butter temperature at exactly 60°F',
      'Multiple folding sessions',
      'Precise rolling technique',
    ],
  },
  {
    id: '4',
    title: 'Proofing & Shaping',
    description:
      'Our pastries are carefully shaped and proofed to develop the perfect texture and flavor.',
    time: '5:00 AM',
    icon: Clock,
    details: [
      'Controlled humidity environment',
      'Optimal proofing temperature',
      'Hand-shaped for authenticity',
      'Timed to perfection',
    ],
  },
  {
    id: '5',
    title: 'Baking Excellence',
    description:
      'Finally, everything is baked fresh in our traditional ovens for the perfect golden finish.',
    time: '6:00 AM',
    icon: CheckCircle,
    details: [
      'Stone deck ovens for even heat',
      'Steam injection for perfect crust',
      'Precise timing for each item',
      'Golden perfection achieved',
    ],
  },
];

interface BakingProcessProps {
  className?: string;
}

export function BakingProcess({ className }: BakingProcessProps) {
  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-4">Our Daily Baking Process</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every morning before dawn, our traditional French baking process begins. From ingredient
          selection to the final golden-brown perfection.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 hidden lg:block" />

        <div className="space-y-8">
          {bakingSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div
                className={`lg:flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className="flex-1">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {step.time}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Step {step.id}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground mb-4">{step.description}</p>
                          <div className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline connector */}
                <div className="hidden lg:block relative">
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-secondary/30 inline-block">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <div className="text-lg font-semibold">Fresh Every Morning</div>
                <div className="text-sm text-muted-foreground">
                  Our baking process begins at 2 AM and continues until we open at 8 AM, ensuring
                  everything is perfectly fresh for our customers.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
