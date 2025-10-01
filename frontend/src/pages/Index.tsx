import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import Home from "./Home";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-md px-6 pt-20">
        <Home />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
