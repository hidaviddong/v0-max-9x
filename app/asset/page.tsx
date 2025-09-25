"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { createColumns, DataTable } from "@/components/data-table";
import { useLanguage } from "@/contexts/language-context";
import { useAssets } from "@/lib/query";
import { useState } from "react";

export default function AssetPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const assetsQuery = useAssets(search);
  const isLoading = assetsQuery.isLoading;
  const data = assetsQuery.data || [];
  const columns = createColumns(t);
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Asset
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            {t.dataBridge.description}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={data}
            searchValue={search}
            onSearchChange={setSearch}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
