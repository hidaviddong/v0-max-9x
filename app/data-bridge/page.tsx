import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DataTable } from "@/components/data-table"
import { columns, type Asset } from "@/components/data-table"

const mockData: Asset[] = [
  {
    "Asset ID": "2b51a5a0-d52a-4122-bb5c-4854e97f2b58",
    "Asset Name": "Asset-287",
    Link: "https://example.com/assets/asset-287",
    Impact: "Low",
    Heat: 0.63,
    Profitability: 0.8257,
    Portfolio: "Income",
    "Listing Date": "2024-10-09",
    Type: "Fund",
  },
  {
    "Asset ID": "1958fe68-dc11-4a99-8a4e-31e5ac8f504f",
    "Asset Name": "Asset-294",
    Link: "https://example.com/assets/asset-294",
    Impact: "High",
    Heat: 0.36,
    Profitability: 0.8482,
    Portfolio: "Growth",
    "Listing Date": "2025-03-18",
    Type: "Bond",
  },
  {
    "Asset ID": "49aed62b-7a73-4733-aa15-0eca46846ba1",
    "Asset Name": "Asset-366",
    Link: "https://example.com/assets/asset-366",
    Impact: "Low",
    Heat: 0.13,
    Profitability: 1.2723,
    Portfolio: "Growth",
    "Listing Date": "2025-02-28",
    Type: "Stock",
  },
  {
    "Asset ID": "91cd75cb-a08e-458f-a60d-1ec9f5e0c3b0",
    "Asset Name": "Asset-566",
    Link: "https://example.com/assets/asset-566",
    Impact: "Low",
    Heat: 0.18,
    Profitability: 0.0011,
    Portfolio: "Growth",
    "Listing Date": "2025-03-22",
    Type: "Bond",
  },
  {
    "Asset ID": "3df3ca46-8180-499c-b426-f75df307790f",
    "Asset Name": "Asset-564",
    Link: "https://example.com/assets/asset-564",
    Impact: "Low",
    Heat: 0.73,
    Profitability: 0.4005,
    Portfolio: "Income",
    "Listing Date": "2025-09-19",
    Type: "Bond",
  },
  {
    "Asset ID": "5fecec5d-6206-4420-9c5c-c3be9280b480",
    "Asset Name": "Asset-262",
    Link: "https://example.com/assets/asset-262",
    Impact: "High",
    Heat: 0.07,
    Profitability: 0.0905,
    Portfolio: "Tech",
    "Listing Date": "2025-09-03",
    Type: "Fund",
  },
  {
    "Asset ID": "faa09efb-68ea-4c23-9418-2c62094e148b",
    "Asset Name": "Asset-139",
    Link: "https://example.com/assets/asset-139",
    Impact: "High",
    Heat: 1.0,
    Profitability: 1.1622,
    Portfolio: "Growth",
    "Listing Date": "2025-01-08",
    Type: "Real Estate",
  },
  {
    "Asset ID": "7fc4bf24-36d1-4cb2-912f-2404e7c0c745",
    "Asset Name": "Asset-135",
    Link: "https://example.com/assets/asset-135",
    Impact: "Low",
    Heat: 0.67,
    Profitability: 1.4748,
    Portfolio: "Growth",
    "Listing Date": "2025-07-13",
    Type: "Crypto",
  },
  {
    "Asset ID": "ffbee6d8-8ae8-4bbf-8769-02bceed52092",
    "Asset Name": "Asset-855",
    Link: "https://example.com/assets/asset-855",
    Impact: "High",
    Heat: 0.88,
    Profitability: 0.0514,
    Portfolio: "Tech",
    "Listing Date": "2025-09-15",
    Type: "Crypto",
  },
  {
    "Asset ID": "0b308701-d317-4c97-a6f1-5f5c33b7efa8",
    "Asset Name": "Asset-661",
    Link: "https://example.com/assets/asset-661",
    Impact: "Medium",
    Heat: 0.37,
    Profitability: 1.3043,
    Portfolio: "Income",
    "Listing Date": "2025-05-14",
    Type: "Crypto",
  },
]

export default function DataBridgePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Asset{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Data Bridge
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Comprehensive view of all your digital assets with real-time data and analytics.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <DataTable columns={columns} data={mockData} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
