"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react"
import { TooltipProvider } from "@radix-ui/react-tooltip"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useLanguage } from "@/contexts/language-context"

interface TruncatedTextProps {
  text: string
  maxLength?: number
  className?: string
}

function TruncatedText({ text, maxLength = 20, className = "" }: TruncatedTextProps) {
  const shouldTruncate = text.length > maxLength
  const displayText = shouldTruncate ? `${text.slice(0, maxLength)}...` : text

  if (!shouldTruncate) {
    return <div className={className}>{text}</div>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`${className} cursor-help`}>{displayText}</div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs break-words">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export type Asset = {
  "Asset ID": string
  "Asset Name": string
  Link: string
  Impact: string | number
  Heat: number
  Profitability: number
  Portfolio: string
  "Listing Date": string
  Type: string
}

export const createColumns = (t: any): ColumnDef<Asset>[] => [
  {
    accessorKey: "Asset ID",
    header: t.dataBridge.table.headers.assetId,
    cell: ({ row }) => <TruncatedText text={row.getValue("Asset ID")} maxLength={15} className="font-mono text-sm" />,
  },
  {
    accessorKey: "Asset Name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t.dataBridge.table.headers.assetName}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <TruncatedText text={row.getValue("Asset Name")} maxLength={25} className="font-medium" />,
  },
  {
    accessorKey: "Link",
    header: t.dataBridge.table.headers.link,
    cell: ({ row }) => (
      <a
        href={row.getValue("Link")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-500 hover:text-orange-600 underline"
      >
        {t.dataBridge.table.actions.viewAsset}
      </a>
    ),
  },
  {
    accessorKey: "Impact",
    header: t.dataBridge.table.headers.impact,
    cell: ({ row }) => {
      const impact = row.getValue("Impact") as string | number
      const impactValue = typeof impact === "number" ? impact.toString() : impact
      const impactText =
        impactValue === "High" || impact === "high"
          ? t.dataBridge.table.impact.high
          : impactValue === "Medium" || impact === "medium"
            ? t.dataBridge.table.impact.medium
            : t.dataBridge.table.impact.low

      const impactLevel =
        typeof impact === "number" ? (impact > 300 ? "High" : impact > 100 ? "Medium" : "Low") : impactValue

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            impactLevel === "High"
              ? "bg-red-100 text-red-800"
              : impactLevel === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {typeof impact === "number" ? impact : impactText}
        </div>
      )
    },
  },
  {
    accessorKey: "Heat",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t.dataBridge.table.headers.heat}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const heat = Number.parseFloat(row.getValue("Heat"))
      return <div className="text-right font-mono">{heat.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "Profitability",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t.dataBridge.table.headers.profitability}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const profitability = Number.parseFloat(row.getValue("Profitability"))
      return (
        <div className={`text-right font-mono ${profitability > 1 ? "text-green-600" : "text-red-600"}`}>
          {profitability.toFixed(4)}
        </div>
      )
    },
  },
  {
    accessorKey: "Portfolio",
    header: t.dataBridge.table.headers.portfolio,
    cell: ({ row }) => <div className="capitalize">{row.getValue("Portfolio")}</div>,
  },
  {
    accessorKey: "Listing Date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {t.dataBridge.table.headers.listingDate}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("Listing Date"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "Type",
    header: t.dataBridge.table.headers.type,
    cell: ({ row }) => <div className="capitalize">{row.getValue("Type")}</div>,
  },
]

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onSearchChange?: (query: string) => void
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSearchChange,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const { t } = useLanguage()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [searchValue, setSearchValue] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)
    onSearchChange?.(value)
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="relative max-w-sm">
          <Input
            placeholder={t.dataBridge.table.actions.filterAssets}
            value={searchValue}
            onChange={handleSearchChange}
            className="pr-10"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-transparent">
              {t.dataBridge.table.actions.columns} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="rounded-md border overflow-x-auto overflow-y-hidden"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >
        <div className="min-w-max">
          <Table className="w-full" style={{ minWidth: "1200px" }}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-white whitespace-nowrap px-4">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading...
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {t.dataBridge.table.actions.noResults}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
