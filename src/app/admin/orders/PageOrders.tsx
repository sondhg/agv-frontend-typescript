import { DataTable } from "@/components/ui/data-table";
import { deleteOrder, getOrders } from "@/services/APIs/orders.apiServices";
import { Order } from "@/types/Order.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columnsTableOrders";
import { DialogFormCreateOrders } from "./DialogFormCreateOrders";

export function PageOrders() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [listData, setListData] = useState<Order[]>([]);

  const fetchListData = async () => {
    const data = await getOrders();
    setListData(data);
  };

  const handleClickBtnDelete = async (order_id: number) => {
    console.log(">>> delete order with id: ", order_id);

    try {
      await deleteOrder(order_id);
      toast.success("Delete order successfully");
      await fetchListData();
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Orders</h2>
        <DialogFormCreateOrders
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          fetchListData={fetchListData}
        />

        <DataTable
          data={listData}
          columns={columns(handleClickBtnDelete)}
          filterSearchByColumn="order_date"
        />
      </div>
    </>
  );
}
