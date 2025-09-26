import { useQuery } from "@tanstack/react-query";
import { type Asset } from "@/components/data-table";
import { useSession } from "@clerk/nextjs";
import { toast } from "sonner";

export const KEYS = {
  ASSETS: "assets",
};

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

export function useAssets(search: string) {
  const { session } = useSession();
  const assetsQuery = useQuery({
    queryKey: ["assets", search || "all", session?.id],
    queryFn: async () => {
      const url = search
        ? `${
            process.env.NEXT_PUBLIC_FASTAPI_URL
          }/search_assets?q=${encodeURIComponent(search)}`
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
  return assetsQuery;
}
