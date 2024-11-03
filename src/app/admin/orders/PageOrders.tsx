import { DialogCreateOrder } from "./components/dialogs/DialogCreateOrder";

export function PageOrders() {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold">Orders</h2>
      <DialogCreateOrder />
    </div>
  );
}
