import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ISchedule } from "@/types/types";

// Dummy data import
import { listSchedules as dummySchedules } from "./dummyData";

interface TableSchedulesProps {
  listSchedules?: ISchedule[];
}

export function TableSchedules({
  listSchedules = dummySchedules,
}: TableSchedulesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 5;

  // Ensure listSchedules is always an array
  const scheduleData = Array.isArray(listSchedules) ? listSchedules : [];
  const totalPages = Math.ceil(scheduleData.length / ROWS_PER_PAGE);

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = scheduleData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const tableHeaders: { name: string; key: keyof ISchedule }[] = [
    { name: "Schedule ID", key: "schedule_id" },
    { name: "Order ID", key: "order_id" },
    { name: "Order date", key: "order_date" },
    { name: "Est. Start time", key: "est_start_time" },
    { name: "Est. End time", key: "est_end_time" },
    { name: "Start point", key: "start_point" },
    { name: "End point", key: "end_point" },
    { name: "Load name", key: "load_name" },
    { name: "Load amount", key: "load_amount" },
    { name: "Load weight", key: "load_weight" },
  ];

  return (
    <div className="relative min-h-96">
      <div className="rounded-md border-2">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  className={header.name === "Schedule ID" ? "w-[120px]" : ""}
                >
                  {header.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((item: ISchedule, index) => (
                <TableRow key={index}>
                  {tableHeaders.map((header, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={
                        header.key === "schedule_id" ? "font-medium" : ""
                      }
                    >
                      {header.key === "load_amount"
                        ? `${item[header.key]} units`
                        : header.key === "load_weight"
                          ? `${item[header.key]} kg`
                          : item[header.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length}>
                  No schedules available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="absolute bottom-0 mt-4 w-full">
        <PaginationContent>
          <PaginationItem>
            {/* Conditionally render the previous button */}
            {currentPage > 1 && (
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            )}
          </PaginationItem>

          {/* Render page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            {/* Conditionally render the next button */}
            {currentPage < totalPages && (
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
