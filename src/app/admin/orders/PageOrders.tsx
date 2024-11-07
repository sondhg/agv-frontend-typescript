import { DataTable } from "@/components/ui/data-table";
import { deleteOrder, getOrders } from "@/services/APIs/orders.apiServices";
import { Order } from "@/types/Order.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columnsTableOrders";
import { DialogCreateOrders } from "./DialogCreateOrders";

export function PageOrders() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [listOrders, setListOrders] = useState<Order[]>([]);

  const fetchListOrders = async () => {
    const data = await getOrders();
    setListOrders(data);
  };

  const handleClickBtnDelete = async (order_id: number) => {
    console.log(">>> delete order with id: ", order_id);

    try {
      await deleteOrder(order_id);
      toast.success("Delete order successfully");
      await fetchListOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  useEffect(() => {
    fetchListOrders();
  }, []);

  return (
    <>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Orders</h2>
        <DialogCreateOrders
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          fetchListOrders={fetchListOrders}
        />

        <DataTable
          data={listOrders}
          columns={columns(handleClickBtnDelete)}
          filterSearchByColumn="order_date"
        />
      </div>
    </>
  );
}
