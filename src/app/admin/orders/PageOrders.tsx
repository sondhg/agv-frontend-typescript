import { deleteOrder, getOrders } from "@/services/apiServices";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../../../components/ui/data-table";
import { DialogCreateOrder } from "./components/DialogCreateOrder";
import { columns, Order } from "./components/columns";

export function PageOrders() {
  const [listOrders, setListOrders] = useState<Order[]>([]);

  const fetchListOrders = async () => {
    const data = await getOrders();
    setListOrders(data);
  };

  const handleDeleteOrder = async (order_id: number) => {
    try {
      await deleteOrder(order_id); // Assuming you have a deleteOrder function in your apiServices.tsx
      fetchListOrders(); // Refresh data after deletion
      toast.success("Order deleted");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  useEffect(() => {
    fetchListOrders();
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold">Orders</h2>
      <DialogCreateOrder fetchListOrders={fetchListOrders} />
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns(handleDeleteOrder)} // Pass handleDeleteOrder to columns
          data={listOrders}
          filterSearchByColumn="order_date"
        />
      </div>
    </div>
  );
}
