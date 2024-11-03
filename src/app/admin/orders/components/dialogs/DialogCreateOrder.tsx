import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormCreateOrder } from "../forms/FormCreateOrder";
import { useState } from "react";

export function DialogCreateOrder() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false); // Update the state to close the dialog
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Create Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] min-w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>Add inputs for your AGV here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <FormCreateOrder onClose={handleClose} /> {/* Pass handleClose */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
