import { User } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">₿Y</span>
          </div>
          <span className="font-semibold text-lg">Bitcoin Yield</span>
        </div>
        
        <button className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
