import { FavoritesSection } from '@/components/ui/favorites-section';

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FavoritesSection showAll={true} />
    </div>
  );
}

export const metadata = {
  title: 'My Favorites',
  description: 'Your saved favorite items from La Brioche',
};