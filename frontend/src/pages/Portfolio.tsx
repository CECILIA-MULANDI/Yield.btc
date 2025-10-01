import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const timeframes = ["7D", "30D", "All"] as const;

const transactions = [
  {
    type: "Interest Earned",
    timestamp: "Jan 15, 2025 • 2:34 PM",
    amount: "+0.0003 BTC",
    usd: "+$18.54",
    icon: TrendingUp,
    iconBg: "bg-success/20",
    iconColor: "text-success",
  },
  {
    type: "Deposit",
    timestamp: "Jan 14, 2025 • 10:22 AM",
    amount: "+0.0500 BTC",
    usd: "+$3,090.00",
    icon: ArrowDownLeft,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    type: "Withdraw",
    timestamp: "Jan 12, 2025 • 4:15 PM",
    amount: "-0.0150 BTC",
    usd: "-$927.00",
    icon: ArrowUpRight,
    iconBg: "bg-muted",
    iconColor: "text-foreground",
  },
  {
    type: "Interest Earned",
    timestamp: "Jan 11, 2025 • 2:34 PM",
    amount: "+0.0002 BTC",
    usd: "+$12.36",
    icon: TrendingUp,
    iconBg: "bg-success/20",
    iconColor: "text-success",
  },
  {
    type: "Deposit",
    timestamp: "Jan 10, 2025 • 9:12 AM",
    amount: "+0.0300 BTC",
    usd: "+$1,854.00",
    icon: ArrowDownLeft,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
];

const Portfolio = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState<typeof timeframes[number]>("30D");

  return (
    <div className="animate-fade-in pb-24">
      {/* Performance Chart */}
      <div className="rounded-2xl bg-gradient-to-br from-card to-card-elevated border border-white/5 p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Performance</h2>
          <div className="flex gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedTimeframe === tf
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Simple chart visualization */}
        <div className="relative h-48 flex items-end gap-1">
          {[65, 68, 70, 72, 71, 73, 76, 78, 80, 79, 82, 85, 84, 86, 88, 90, 89, 91, 93, 95].map(
            (height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-primary/80 to-primary/40 rounded-t"
                style={{ height: `${height}%` }}
              />
            )
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold">$5,234.50</span>
          <span className="text-sm text-success font-medium">+$127.23 (2.49%)</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-xl bg-gradient-to-br from-card to-card-elevated border border-white/5 p-4 shadow-subtle">
          <p className="text-label mb-1">Principal</p>
          <p className="text-xl font-bold">$5,107</p>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-card to-card-elevated border border-white/5 p-4 shadow-subtle">
          <p className="text-label mb-1">Earned</p>
          <p className="text-xl font-bold text-success">$127.50</p>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-card to-card-elevated border border-white/5 p-4 shadow-subtle">
          <p className="text-label mb-1">APY</p>
          <p className="text-xl font-bold text-success">8.5%</p>
        </div>
        
        <div className="rounded-xl bg-gradient-to-br from-card to-card-elevated border border-white/5 p-4 shadow-subtle">
          <p className="text-label mb-1">% Gain</p>
          <p className="text-xl font-bold">+2.49%</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Transaction History</h2>
          <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-0">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full ${tx.iconBg} flex items-center justify-center`}>
                  <tx.icon className={`h-5 w-5 ${tx.iconColor}`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-sm">{tx.amount}</p>
                <p className="text-xs text-muted-foreground">{tx.usd}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bar */}
      <div className="fixed bottom-16 left-0 right-0 px-6 py-4 bg-background/95 backdrop-blur-lg border-t border-white/5">
        <div className="mx-auto max-w-md flex gap-3">
          <Button
            className="flex-1"
            onClick={() => navigate("/deposit")}
          >
            Add More
          </Button>
          <Button
            className="flex-1"
            variant="outline"
          >
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
