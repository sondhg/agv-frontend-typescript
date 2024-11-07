import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { getSchedules } from "@/services/APIs/schedules.apiServices";
import { Schedule } from "@/types/Schedule.types";
import { useEffect, useState } from "react";
import { columns } from "./columnsTableSchedules";

export function PageSchedules() {
  const [listSchedules, setListSchedules] = useState<Schedule[]>([]);

  const fetchListSchedules = async () => {
    const data = await getSchedules();
    console.log(">>> data: ", data);
    setListSchedules(data);
  };

  useEffect(() => {
    fetchListSchedules();
  }, []);

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Schedules</h2>
        <Button onClick={fetchListSchedules}>Fetch Schedules</Button>
        <DataTable
          data={listSchedules}
          columns={columns}
          filterSearchByColumn="order_date"
        />
      </div>
    </div>
  );
}
