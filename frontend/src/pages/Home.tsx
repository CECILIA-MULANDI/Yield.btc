import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BalanceCard } from "@/components/BalanceCard";
import { APYCard } from "@/components/APYCard";
import { RecentActivity } from "@/components/RecentActivity";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in pb-24">
      <BalanceCard />
      
      <div className="mt-4 w-3/5">
        <APYCard />
      </div>
      
      <div className="mt-6 space-y-3">
        <Button
          className="w-full"
          size="lg"
          onClick={() => navigate("/deposit")}
        >
          Deposit Bitcoin
        </Button>
        
        <Button
          className="w-full"
          size="sm"
          variant="outline"
        >
          Withdraw
        </Button>
      </div>
      
      <RecentActivity />
    </div>
  );
};

export default Home;
