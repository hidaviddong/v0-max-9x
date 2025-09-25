import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import AssetClientPage from "./page.client";

export default function AssetPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <AssetClientPage />
      <Footer />
    </div>
  );
}
