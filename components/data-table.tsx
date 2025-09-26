"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/language-context";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  shouldTruncate?: boolean;
}

function TruncatedText({
  text,
  maxLength = 20,
  className = "",
  shouldTruncate = true,
}: TruncatedTextProps) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!shouldTruncate) {
    return <div className={className}>{text}</div>;
  }

  const needsTruncation = text.length > maxLength;
  const displayText = needsTruncation ? `${text.slice(0, maxLength)}...` : text;

  if (!needsTruncation) {
    return <div className={className}>{text}</div>;
  }

  if (isMobile) {
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div className={`${className} cursor-pointer`}>{displayText}</div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto max-w-xs p-2 text-sm break-words"
          side="top"
        >
          {text}
        </PopoverContent>
      </Popover>
    );
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
  );
}

export type Asset = {
  "Asset ID": string;
  "Asset Name": string;
  Link: string;
  Impact: string | number;
  Heat: number;
  Profitability: number;
  Portfolio: string;
  "Listing Date": string;
  Type: string;
};

export const createColumns = (t: any): ColumnDef<Asset, unknown>[] => [
  {
    accessorKey: "Asset ID",
    header: t.dataBridge.table.headers.assetId,
    cell: ({ row }) => (
      <TruncatedText
        text={row.getValue("Asset ID")}
        maxLength={15}
        className="font-mono text-sm"
      />
    ),
  },
  {
    accessorKey: "Asset Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t.dataBridge.table.headers.assetName}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <TruncatedText
        text={row.getValue("Asset Name")}
        maxLength={25}
        className="font-medium"
      />
    ),
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
      const impact = row.getValue("Impact") as string | number;
      const impactValue =
        typeof impact === "number" ? impact.toString() : impact;
      const impactText =
        impactValue === "High" || impact === "high"
          ? t.dataBridge.table.impact.high
          : impactValue === "Medium" || impact === "medium"
          ? t.dataBridge.table.impact.medium
          : t.dataBridge.table.impact.low;

      const impactLevel =
        typeof impact === "number"
          ? impact > 300
            ? "High"
            : impact > 100
            ? "Medium"
            : "Low"
          : impactValue;

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
      );
    },
  },
  {
    accessorKey: "Heat",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t.dataBridge.table.headers.heat}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const heat = Number.parseFloat(row.getValue("Heat"));
      return <div className="font-mono">{heat.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "Profitability",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t.dataBridge.table.headers.profitability}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const profitability = Number.parseFloat(row.getValue("Profitability"));
      return (
        <div
          className={`font-mono ${
            profitability > 1 ? "text-green-600" : "text-red-600"
          }`}
        >
          {profitability.toFixed(4)}
        </div>
      );
    },
  },
  {
    accessorKey: "Portfolio",
    header: t.dataBridge.table.headers.portfolio,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Portfolio")}</div>
    ),
  },
  {
    accessorKey: "Listing Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t.dataBridge.table.headers.listingDate}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("Listing Date"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "Type",
    header: t.dataBridge.table.headers.type,
    cell: ({ row }) => <div className="capitalize">{row.getValue("Type")}</div>,
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable({
  columns,
  data,
  isLoading = false,
  onSearchChange,
}: DataTableProps<Asset, unknown> & {
  onSearchChange?: (value: string) => void;
}) {
  const { user } = useUser();
  const permissions = (user?.publicMetadata.permissions as string[]) || [];
  const hasSearchPermission = permissions.includes("assets:search");

  const { t } = useLanguage();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const visibleColumnIds = visibleColumns.map((col) => col.id);
  const isOnlyAssetIdVisible =
    visibleColumnIds.length === 1 && visibleColumnIds.includes("Asset ID");
  const isOnlyAssetNameVisible =
    visibleColumnIds.length === 1 && visibleColumnIds.includes("Asset Name");

  const dynamicColumns = React.useMemo<ColumnDef<Asset, unknown>[]>(() => {
    return createColumns(t).map((column) => {
      if ((column as any).accessorKey === "Asset ID") {
        return {
          ...column,
          cell: ({ row }: any) => (
            <TruncatedText
              text={row.getValue("Asset ID")}
              maxLength={15}
              className="font-mono text-sm"
              shouldTruncate={!isOnlyAssetIdVisible}
            />
          ),
        };
      }
      if ((column as any).accessorKey === "Asset Name") {
        return {
          ...column,
          cell: ({ row }: any) => (
            <TruncatedText
              text={row.getValue("Asset Name")}
              maxLength={25}
              className="font-medium"
              shouldTruncate={!isOnlyAssetNameVisible}
            />
          ),
        };
      }
      return column;
    });
  }, [t, isOnlyAssetIdVisible, isOnlyAssetNameVisible]);

  const setSearchValue = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const tableInstance = useReactTable<Asset>({
    data,
    columns: dynamicColumns,
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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {hasSearchPermission && (
          <div className="relative max-w-sm">
            <Input
              placeholder={t.dataBridge.table.actions.filterAssets}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pr-10 selection:bg-blue-500 selection:text-white dark:selection:bg-blue-400 dark:selection:text-gray-900"
            />
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-transparent">
              {t.dataBridge.table.actions.columns}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {tableInstance
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="rounded-md border">
        <div className="min-w-max">
          <Table className="w-full">
            <TableHeader>
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-white whitespace-nowrap px-4"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={dynamicColumns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Loading...
                    </div>
                  </TableCell>
                </TableRow>
              ) : tableInstance.getRowModel().rows?.length ? (
                tableInstance.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap px-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={dynamicColumns.length}
                    className="h-24 text-center"
                  >
                    {t.dataBridge.table.actions.noResults}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
