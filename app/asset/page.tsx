"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { type Asset, createColumns, DataTable } from "@/components/data-table";
import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { useSession } from "@clerk/nextjs";
import { toast } from "sonner";

function transformApiData(apiData: any): Asset[] {
  return apiData.map((item: any) => ({
    "Asset ID": item._source["Asset ID"],
    "Asset Name": item._source["Asset Name"],
    Link: item._source.Link,
    Impact: item._source.Impact,
    Heat: item._source.Heat,
    Profitability: item._source.Profitability,
    Portfolio: item._source.Portfolio,
    "Listing Date": item._source["Listing Date"],
    Type: item._source.Type,
  }));
}

export default function AssetPage() {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300, false);
  const { session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["assets", debouncedSearch || "all", session?.id],
    queryFn: async () => {
      const url = debouncedSearch
        ? `${
            process.env.NEXT_PUBLIC_FASTAPI_URL
          }/search_assets?q=${encodeURIComponent(String(debouncedSearch))}`
        : `${process.env.NEXT_PUBLIC_FASTAPI_URL}/all_assets`;
      const token = await session?.getToken();
      const response = await fetch(url, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.detail || "Request failed");
      }
      return data;
    },
    select: (data) => transformApiData(data),
    enabled: !!session,
  });
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
            data={data || []}
            searchValue={search}
            onSearchChange={setSearch}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
