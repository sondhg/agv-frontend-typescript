import { DataTable } from "@/components/ui/data-table";
import { deleteOrder, getOrders } from "@/services/APIs/orders.apiServices";
import { Order } from "@/types/Order.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columnsTableOrders";
import { DialogFormCreateOrders } from "./DialogFormCreateOrders";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { handleImportCSV } from "@/services/csvImportServices";

export function PageOrders() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [listData, setListData] = useState<Order[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImportCSV(file, fetchListData).finally(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Orders</h2>
        <div className="space-x-5">
          <DialogFormCreateOrders
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            fetchListData={fetchListData}
          />
          <Button
            variant={"secondary"}
            onClick={() => fileInputRef.current?.click()}
          >
            Import CSV
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <DataTable
          data={listData}
          columns={columns(handleClickBtnDelete)}
          filterSearchByColumn="order_date"
        />
      </div>
    </>
  );
}
