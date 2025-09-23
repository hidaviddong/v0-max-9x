import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ClientPage from "./client-page"
import type { Asset } from "@/components/data-table"

function transformApiData(apiData: any[]): Asset[] {
  return apiData.map((item) => ({
    "Asset ID": item._source["Asset ID"],
    "Asset Name": item._source["Asset Name"],
    Link: item._source.Link,
    Impact: item._source.Impact,
    Heat: item._source.Heat,
    Profitability: item._source.Profitability,
    Portfolio: item._source.Portfolio,
    "Listing Date": item._source["Listing Date"],
    Type: item._source.Type,
  }))
}

async function getAllAssets(): Promise<Asset[]> {
  try {
    const response = await fetch("https://maxapi.daviddong.me/all_assets", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return transformApiData(data)
  } catch (error) {
    console.error("Failed to fetch assets data:", error)
    return []
  }
}

async function getApiMessage() {
  try {
    const response = await fetch("https://maxapi.daviddong.me/", {
      cache: "no-store",
    })
    const data = await response.json()
    return data.Hello || "No message available"
  } catch (error) {
    console.error("Failed to fetch API data:", error)
    return "Failed to load message"
  }
}

export default async function DataBridgePage() {
  const [initialAssets, apiMessage] = await Promise.all([getAllAssets(), getApiMessage()])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <ClientPage initialData={initialAssets} apiMessage={apiMessage} />
      </main>

      <Footer />
    </div>
  )
}
