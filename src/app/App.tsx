import { useState, useEffect } from "react";
import { Quote, QuoteCard } from "./components/QuoteCard";
import { FavoritesList } from "./components/FavoritesList";
import { quotes } from "./data/quotes";
import { Heart, Home } from "lucide-react";
import { Button } from "./components/ui/button";
import { toast, Toaster } from "sonner";

type View = "home" | "favorites";

export default function App() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [view, setView] = useState<View>("home");

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteQuotes");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    }
    // Set a random quote on initial load
    getRandomQuote();
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
  }, [favorites]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const isFavorite = (quote: Quote) => {
    return favorites.some((fav) => fav.id === quote.id);
  };

  const toggleFavorite = (quote: Quote) => {
    if (isFavorite(quote)) {
      setFavorites(favorites.filter((fav) => fav.id !== quote.id));
      toast.success("Removed from favorites");
    } else {
      setFavorites([...favorites, quote]);
      toast.success("Added to favorites");
    }
  };

  const shareQuote = async (quote: Quote) => {
    const shareText = `"${quote.text}" — ${quote.author}`;

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Daily Quote",
          text: shareText,
        });
      } catch (error) {
        // User cancelled or error occurred
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error sharing:", error);
          fallbackShare(shareText);
        }
      }
    } else {
      // Fallback: copy to clipboard
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Quote copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy quote");
      });
  };

  if (view === "favorites") {
    return (
      <div className="size-full flex items-center justify-center bg-slate-900">
        {/* Mobile Device Container */}
        <div className="w-[390px] h-[844px] bg-background flex flex-col rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-800">
          <FavoritesList
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onShare={shareQuote}
            onBack={() => setView("home")}
          />
          
          {/* Mobile Bottom Navigation */}
          <div className="border-t bg-background">
            <div className="flex items-center justify-around py-3 px-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setView("home")}
                className="flex-col h-auto gap-1 flex-1"
              >
                <Home className="size-6" />
                <span className="text-xs">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="flex-col h-auto gap-1 flex-1 text-primary"
              >
                <Heart className="size-6 fill-current" />
                <span className="text-xs">Favorites</span>
              </Button>
            </div>
          </div>
          
          <Toaster position="top-center" />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex items-center justify-center bg-slate-900">
      {/* Mobile Device Container */}
      <div className="w-[390px] h-[844px] bg-background flex flex-col rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-800">
        {/* Mobile Header */}
        <div className="border-b bg-background px-4 py-4">
          <h1 className="text-2xl text-center">Daily Quote</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
          <div className="w-full space-y-4">
            <QuoteCard
              quote={currentQuote}
              isFavorite={isFavorite(currentQuote)}
              onToggleFavorite={() => toggleFavorite(currentQuote)}
              onShare={() => shareQuote(currentQuote)}
              onNewQuote={getRandomQuote}
              showRefresh={true}
            />
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="border-t bg-background">
          <div className="flex items-center justify-around py-3 px-4">
            <Button
              variant="ghost"
              size="lg"
              className="flex-col h-auto gap-1 flex-1 text-primary"
            >
              <Home className="size-6 fill-current" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setView("favorites")}
              className="flex-col h-auto gap-1 flex-1 relative"
            >
              <Heart className="size-6" />
              <span className="text-xs">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute top-1 right-6 bg-primary text-primary-foreground text-xs rounded-full size-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        <Toaster position="top-center" />
      </div>
    </div>
  );
}