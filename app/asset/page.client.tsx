"use client";

import { createColumns, DataTable } from "@/components/data-table";
import { useLanguage } from "@/contexts/language-context";
import { useAssets } from "@/lib/query";

export default function AssetClientPage() {
  const { t } = useLanguage();
  const assetsQuery = useAssets();
  const isLoading = assetsQuery.isLoading;
  const data = assetsQuery.data || [];
  const columns = createColumns(t);

  return (
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
        <DataTable isLoading={isLoading} columns={columns} data={data} />
      </div>
    </main>
  );
}
