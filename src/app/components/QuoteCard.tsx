import { Heart, Share2, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export interface Quote {
  id: string;
  text: string;
  author: string;
}

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
  onNewQuote?: () => void;
  showRefresh?: boolean;
}

export function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
  onShare,
  onNewQuote,
  showRefresh = false,
}: QuoteCardProps) {
  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div className="space-y-4 min-h-[200px] flex flex-col justify-center">
          <p className="text-xl leading-relaxed text-center">
            "{quote.text}"
          </p>
          <p className="text-base text-muted-foreground text-center">
            — {quote.author}
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={onToggleFavorite}
            className={`flex-1 max-w-[120px] ${isFavorite ? "text-red-500 border-red-500" : ""}`}
          >
            <Heart
              className={`size-5 ${isFavorite ? "fill-current" : ""}`}
            />
          </Button>

          <Button variant="outline" size="lg" onClick={onShare} className="flex-1 max-w-[120px]">
            <Share2 className="size-5" />
          </Button>

          {showRefresh && onNewQuote && (
            <Button variant="outline" size="lg" onClick={onNewQuote} className="flex-1 max-w-[120px]">
              <RefreshCw className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}