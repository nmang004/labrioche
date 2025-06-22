import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  dateAdded: string;
}

interface FavoritesStore {
  items: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, 'dateAdded'>) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavorites: () => FavoriteItem[];
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addFavorite: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        
        if (!existingItem) {
          set((state) => ({
            items: [...state.items, { ...item, dateAdded: new Date().toISOString() }],
          }));
        }
      },
      
      removeFavorite: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      isFavorite: (id) => {
        return get().items.some((item) => item.id === id);
      },
      
      getFavorites: () => {
        return get().items.sort((a, b) => 
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      },
      
      clearFavorites: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'labrioche-favorites',
      version: 1,
    }
  )
);