import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onDelete,
}: DataTableRowActionsProps<TData>) => {
  return (
    <Button variant={"destructive"} onClick={() => onDelete(row.original)}>
      <Trash2 /> Delete
    </Button>
  );
};

export default DataTableRowActions;
