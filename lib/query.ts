import { useQuery } from "@tanstack/react-query";
import { type Asset } from "@/components/data-table";
import { parseAsString, useQueryState } from "nuqs";
import { useDebouncedValue } from "foxact/use-debounced-value";

export const KEYS = {
  ASSETS: "assets",
};

const BASE_URL = "https://maxapi.daviddong.me";

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
  const [searchQuery] = useQueryState("search", parseAsString);
  const searchDebouncedValue = useDebouncedValue(
    searchQuery,
    // delay in ms
    300,
    // optional, default to false. whether to immediately update the debounced value with the first call
    false
  );

  console.log("searchDebouncedValue", searchDebouncedValue);
  const assetsQuery = useQuery({
    queryKey: [KEYS.ASSETS, searchDebouncedValue || "all"],
    queryFn: async () => {
      const url = searchDebouncedValue
        ? `${BASE_URL}/search_assets?q=${searchDebouncedValue}`
        : `${BASE_URL}/all_assets`;

      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    select(data) {
      return transformApiData(data);
    },
  });

  return assetsQuery;
}
