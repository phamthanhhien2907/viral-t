import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { useState, useMemo } from "react";

export function DataTable({ columns, data, searchKey }) {
  const [filterValue, setFilterValue] = useState("");

  // Memoize filtered data
  const filteredData = useMemo(() => {
    return data?.filter((row) => {
      if (Array.isArray(searchKey)) {
        return searchKey?.some((key) => {
          const value = row[key];
          return (
            value &&
            value.toString().toLowerCase().includes(filterValue.toLowerCase())
          );
        });
      } else {
        const value = row[searchKey];
        return (
          value &&
          value.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });
  }, [data, searchKey, filterValue]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters: [],
    },
  });

  return (
    <div className="py-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm..."
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm max-sm:w-max"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
