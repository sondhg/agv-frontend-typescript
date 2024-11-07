import { createMultipleOrdersBatch } from "@/services/APIs/orders.apiServices";
import { CreateOrderDto } from "@/types/Order.types";
import Papa from "papaparse";
import { toast } from "sonner";

// Function to handle the CSV import
export const handleImportCSV = async (
  file: File,
  fetchListData: () => void,
) => {
  // Parse the CSV file
  Papa.parse(file, {
    complete: async (result) => {
      // Validate and map the CSV rows to the expected order format
      const orders: CreateOrderDto[] = result.data.map((row: any) => {
        // Validate each row
        if (
          row.order_id &&
          row.order_date &&
          row.start_time &&
          row.start_point &&
          row.end_point &&
          row.load_name &&
          row.load_amount &&
          row.load_weight
        ) {
          return {
            order_id: row.order_id,
            order_date: row.order_date,
            start_time: row.start_time,
            start_point: row.start_point,
            end_point: row.end_point,
            load_name: row.load_name,
            load_amount: row.load_amount,
            load_weight: row.load_weight,
          };
        } else {
          throw new Error("Invalid CSV row data.");
        }
      });

      try {
        // Send the parsed data to the server
        await createMultipleOrdersBatch(orders);
        toast.success("Orders imported successfully");

        // After importing, refresh the data displayed in the table
        fetchListData();
      } catch (error) {
        console.error("Failed to import orders:", error);
        toast.error("Failed to import orders. Please try again.");
      }
    },
    error: (error) => {
      console.error("CSV parsing error:", error);
      toast.error("Failed to parse CSV. Please check the file format.");
    },
    header: true, // Assuming the first row contains headers
  });
};
