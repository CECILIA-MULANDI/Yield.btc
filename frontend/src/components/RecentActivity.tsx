import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";

const activities = [
  {
    type: "Earned",
    timestamp: "2 hours ago",
    amount: "+0.0003 BTC",
    icon: TrendingUp,
    positive: true,
  },
  {
    type: "Deposit",
    timestamp: "Yesterday",
    amount: "+0.0500 BTC",
    icon: ArrowDownLeft,
    positive: true,
  },
  {
    type: "Withdraw",
    timestamp: "3 days ago",
    amount: "-0.0150 BTC",
    icon: ArrowUpRight,
    positive: false,
  },
];

export const RecentActivity = () => {
  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold text-muted-foreground mb-4">Recent Activity</h2>
      
      <div className="space-y-0">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
                <activity.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{activity.type}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
            
            <p className={`font-medium ${activity.positive ? "text-success" : "text-foreground"}`}>
              {activity.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
