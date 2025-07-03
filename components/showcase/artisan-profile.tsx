'use client';

import Image from 'next/image';
import { Award, Clock, MapPin, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ArtisanProfileProps {
  className?: string;
}

export function ArtisanProfile({ className }: ArtisanProfileProps) {
  const achievements = [
    { icon: Award, text: 'Trained in Lyon, France' },
    { icon: Clock, text: '15+ Years Experience' },
    { icon: MapPin, text: 'Apprenticed in Provence' },
    { icon: Heart, text: 'Passionate About Tradition' },
  ];

  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-4">Meet Our Master Baker</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the passion and expertise behind every authentic French creation at La Brioche.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <Card className="overflow-hidden">
            <div className="relative h-[600px]">
              <Image
                src="/photos/yvan.webp"
                alt="Yvan, Master Baker at La Brioche"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">Yvan Lemoine</h3>
                <p className="text-sm opacity-90">Master Baker & Owner</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-serif mb-4">A Life Dedicated to Artisan Baking</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Born and raised in the heart of France, Yvan discovered his passion for baking at
                the age of 14 when he began his apprenticeship at a traditional boulangerie in Lyon.
                Under the tutelage of master bakers, he learned the time-honored techniques that
                have been passed down through generations.
              </p>
              <p>
                After completing his formal training, Yvan spent several years perfecting his craft
                across different regions of France, from the butter-rich pastries of Normandy to the
                rustic breads of Provence. Each region taught him something new about the art of
                French baking.
              </p>
              <p>
                In 2015, Yvan brought his expertise to Norfolk, Virginia, with a dream to share
                authentic French baking with the local community. Every morning, he arrives before
                dawn to begin the meticulous process of creating each pastry and bread by hand.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Credentials & Experience</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <achievement.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{achievement.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Philosophy</h4>
            <Card className="bg-secondary/30">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-center">
                  &ldquo;True French baking is not just about technique—it&apos;s about respect for
                  tradition, quality ingredients, and the patience to let time work its magic. Every
                  croissant tells a story, every baguette carries the soul of France.&rdquo;
                </blockquote>
                <div className="text-center mt-4">
                  <cite className="text-sm text-muted-foreground">— Yvan Lemoine</cite>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Traditional Croissants</Badge>
              <Badge variant="secondary">Artisan Breads</Badge>
              <Badge variant="secondary">Classic Pâtisserie</Badge>
              <Badge variant="secondary">Seasonal Specialties</Badge>
              <Badge variant="secondary">Wedding Cakes</Badge>
              <Badge variant="secondary">Macarons</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
