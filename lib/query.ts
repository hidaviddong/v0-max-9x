import { useQuery } from "@tanstack/react-query";
import { type Asset } from "@/components/data-table";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { useSession } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const KEYS = {
  ASSETS: "assets",
};

const BASE_URL_PROD = "https://maxapi.daviddong.me";
const BASE_URL_DEV = "http://localhost:8000";

const isDev = process.env.NODE_ENV === "development";
const BASE_URL = isDev ? BASE_URL_DEV : BASE_URL_PROD;

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

export function useAssets() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const searchDebouncedValue = useDebouncedValue(searchQuery, 300, false);
  const { session } = useSession();
  const assetsQuery = useQuery({
    queryKey: [KEYS.ASSETS, searchDebouncedValue || "all", session?.id],
    queryFn: async () => {
      const url = searchDebouncedValue
        ? `${BASE_URL}/search_assets?q=${searchDebouncedValue}`
        : `${BASE_URL}/all_assets`;

      const token = await session?.getToken();
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.detail);
      }
      return data;
    },
    select(data) {
      return transformApiData(data);
    },
    enabled: !!session,
  });
  return assetsQuery;
}
