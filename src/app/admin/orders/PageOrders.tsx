import { DataTable } from "@/components/ui/data-table";
import { Order } from "@/types/Order.types";
import { useEffect, useState } from "react";
import { FormOrder } from "./components/FormOrder";
import { columns } from "./components/columns";
import { deleteOrder, getOrders } from "@/services/apiServices";
import { toast } from "sonner";

export function PageOrders() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
    <>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Orders</h2>
        <FormOrder
          isOpen={isDialogOpen}
          order={selectedOrder}
          onOpenChange={(value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedOrder(null);
            }
          }}
        />
        <DataTable
          data={listOrders}
          columns={columns(handleDeleteOrder)}
          filterSearchByColumn="order_date"
        />
      </div>
    </>
  );
}
