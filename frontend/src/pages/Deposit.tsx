import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"BTC" | "USD">("BTC");

  const estimatedUSDC = currency === "BTC" 
    ? (parseFloat(amount || "0") * 61800).toFixed(2)
    : (parseFloat(amount || "0") / 61800).toFixed(8);

  const estimatedAPY = parseFloat(amount || "0") > 0 
    ? (parseFloat(estimatedUSDC) * 0.085).toFixed(2)
    : "0.00";

  return (
    <div className="animate-fade-in pb-24">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {["Convert", "Bridge", "Deposit", "Done"].map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`h-2 w-2 rounded-full ${
                    index === 0 ? "bg-primary" : "bg-muted"
                  }`}
                />
                <span
                  className={`mt-2 text-xs font-medium ${
                    index === 0 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < 3 && (
                <div className="h-px w-12 mx-2 bg-muted" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-card to-card-elevated border border-white/5 p-6 shadow-card">
        <label className="text-label mb-3 block">Amount to Deposit</label>
        
        <Input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-auto border-0 border-b-2 border-white/10 bg-transparent text-5xl font-semibold focus-visible:border-primary focus-visible:ring-0 px-0 rounded-none"
        />
        
        <div className="mt-4 flex gap-2">
          <Button
            size="sm"
            variant={currency === "BTC" ? "default" : "outline"}
            onClick={() => setCurrency("BTC")}
            className="flex-1"
          >
            BTC
          </Button>
          <Button
            size="sm"
            variant={currency === "USD" ? "default" : "outline"}
            onClick={() => setCurrency("USD")}
            className="flex-1"
          >
            USD
          </Button>
        </div>
        
        <p className="mt-4 text-base text-muted-foreground">
          ≈ {estimatedUSDC} USDC
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-primary/5 border border-primary/15 p-5">
        <p className="text-label mb-3">You'll receive</p>
        <p className="text-2xl font-bold mb-4">{estimatedUSDC} USDC</p>
        
        <div className="h-px bg-white/10 my-4" />
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated APY</span>
            <span className="font-medium text-success">8.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Est. yearly earnings</span>
            <span className="font-medium">${estimatedAPY}</span>
          </div>
        </div>
      </div>

      <Button
        className="w-full mt-6"
        size="lg"
        disabled={!amount || parseFloat(amount) <= 0}
      >
        Confirm Deposit
      </Button>
    </div>
  );
};

export default Deposit;
