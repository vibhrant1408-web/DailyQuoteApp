import { Quote, QuoteCard } from "./QuoteCard";
import { Heart } from "lucide-react";

interface FavoritesListProps {
  favorites: Quote[];
  onToggleFavorite: (quote: Quote) => void;
  onShare: (quote: Quote) => void;
  onBack: () => void;
}

export function FavoritesList({
  favorites,
  onToggleFavorite,
  onShare,
  onBack,
}: FavoritesListProps) {
  return (
    <div className="flex-1 overflow-auto">
      {/* Mobile Header */}
      <div className="sticky top-0 border-b bg-background px-4 py-4 z-10">
        <h1 className="text-2xl text-center">Favorites</h1>
      </div>

      <div className="p-4">
        {favorites.length === 0 ? (
          <div className="text-center py-16 px-4 text-muted-foreground">
            <Heart className="size-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg mb-2">No favorite quotes yet</p>
            <p className="text-sm">
              Tap the heart icon on quotes you love to save them here.
            </p>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {favorites.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(quote)}
                onShare={() => onShare(quote)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}