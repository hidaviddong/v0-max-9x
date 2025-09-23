"use client"

import * as React from "react"
import { useLanguage } from "@/contexts/language-context"
import { DataTable, createColumns, type Asset } from "@/components/data-table"

interface ClientPageProps {
  initialData: Asset[]
  apiMessage: string
}

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

export default function ClientPage({ initialData, apiMessage }: ClientPageProps) {
  const { t } = useLanguage()

  const [data, setData] = React.useState<Asset[]>(initialData)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const searchAssets = React.useCallback(async (query: string) => {
    if (!query.trim()) {
      setIsLoading(true)
      try {
        const response = await fetch("https://maxapi.daviddong.me/all_assets")
        if (response.ok) {
          const apiData = await response.json()
          setData(transformApiData(apiData))
        }
      } catch (error) {
        console.error("Failed to fetch all assets:", error)
      } finally {
        setIsLoading(false)
      }
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`https://maxapi.daviddong.me/search_assets?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const apiData = await response.json()
        setData(transformApiData(apiData))
      }
    } catch (error) {
      console.error("Failed to search assets:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAssets(searchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchAssets])

  const translatedColumns = createColumns(t)

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Asset{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Data Bridge</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">{t.dataBridge.description}</p>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-orange-400 font-medium">
            {t.dataBridge.apiStatus}: {apiMessage}
          </p>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <DataTable columns={translatedColumns} data={data} onSearchChange={setSearchQuery} isLoading={isLoading} />
      </div>
    </>
  )
}
