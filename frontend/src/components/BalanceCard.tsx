import { TrendingUp } from "lucide-react";

export const BalanceCard = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-card to-card-elevated border border-white/5 p-6 shadow-card">
      <p className="text-label mb-2">Total Balance</p>
      <h1 className="text-balance mb-1">0.0847 BTC</h1>
      <p className="text-xl text-muted-foreground mb-3">≈ $5,234.50</p>
      
      <div className="inline-flex items-center gap-1.5 rounded-lg bg-success/15 px-3 py-1.5">
        <TrendingUp className="h-4 w-4 text-success" />
        <span className="text-sm font-medium text-success">+$127.23 (2.49%)</span>
      </div>
    </div>
  );
};
