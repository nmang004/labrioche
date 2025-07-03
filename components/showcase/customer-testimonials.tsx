'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  highlight?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Norfolk, VA',
    rating: 5,
    review:
      "The croissants at La Brioche are absolutely divine! You can taste the authentic French technique in every bite. It's like being transported to a Parisian bakery right here in Norfolk.",
    date: '2024-06-15',
    highlight: 'croissants',
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Virginia Beach, VA',
    rating: 5,
    review:
      "I've been coming here for two years now, and the quality never disappoints. The sourdough is perfectly tangy, and the Opera cake is a masterpiece. Yvan truly is an artist.",
    date: '2024-06-10',
    highlight: 'sourdough & Opera cake',
  },
  {
    id: '3',
    name: 'Emma Davis',
    location: 'Portsmouth, VA',
    rating: 5,
    review:
      'The attention to detail is incredible. From the perfectly laminated pastry to the imported French butter - you can taste the difference. This is authentic French baking at its finest.',
    date: '2024-06-08',
    highlight: 'authentic French baking',
  },
  {
    id: '4',
    name: 'Robert Martinez',
    location: 'Chesapeake, VA',
    rating: 5,
    review:
      'My wife and I drive 30 minutes just for their weekend treats. The macarons are delicate perfection, and the seasonal galette des rois was absolutely spectacular. Worth every mile!',
    date: '2024-06-05',
    highlight: 'macarons & seasonal items',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    location: 'Norfolk, VA',
    rating: 5,
    review:
      'As someone who lived in France for three years, I can honestly say La Brioche captures the essence of a true French boulangerie. The pain au chocolat is exactly as it should be.',
    date: '2024-06-01',
    highlight: 'authentic French experience',
  },
  {
    id: '6',
    name: 'David Wilson',
    location: 'Hampton, VA',
    rating: 5,
    review:
      'The café au lait and fresh baguette make for the perfect morning ritual. The atmosphere is warm and inviting, and the quality is consistently outstanding.',
    date: '2024-05-28',
    highlight: 'morning ritual',
  },
];

interface CustomerTestimonialsProps {
  className?: string;
  maxItems?: number;
  mobileMaxItems?: number;
  showAll?: boolean;
}

export function CustomerTestimonials({
  className,
  maxItems = 6,
  mobileMaxItems = 6,
  showAll = false,
}: CustomerTestimonialsProps) {
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, maxItems);
  const mobileDisplayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, mobileMaxItems);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn('h-4 w-4', index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300')}
      />
    ));
  };

  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif mb-4">What Our Customers Say</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hear from our valued customers who have experienced the authentic taste of France right
          here in Norfolk.
        </p>
      </div>

      {/* Mobile view - show fewer items */}
      <div className="block md:hidden">
        <div className="grid grid-cols-1 gap-6">
          {mobileDisplayedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 text-primary/30 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </span>
                    </div>

                    <blockquote className="text-sm leading-relaxed mb-4 text-foreground">
                      &ldquo;{testimonial.review}&rdquo;
                    </blockquote>

                    <div className="space-y-1">
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                      {testimonial.highlight && (
                        <div className="text-xs text-primary font-medium">
                          Loves: {testimonial.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Desktop view - show all items */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 text-primary/30 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </span>
                    </div>

                    <blockquote className="text-sm leading-relaxed mb-4 text-foreground">
                      &ldquo;{testimonial.review}&rdquo;
                    </blockquote>

                    <div className="space-y-1">
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                      {testimonial.highlight && (
                        <div className="text-xs text-primary font-medium">
                          Loves: {testimonial.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {!showAll && testimonials.length > maxItems && (
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ...and many more happy customers who love authentic French baking!
          </p>
        </div>
      )}
    </div>
  );
}
