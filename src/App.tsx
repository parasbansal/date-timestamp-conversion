import Header from "@/components/Header";
import Convertor from "@/components/Convertor";

export default function App() {
  return (
    <div className="flex flex-col w-screen h-screen bg-background text-foreground">
      <Header />

      <Convertor />
    </div>
  );
}
