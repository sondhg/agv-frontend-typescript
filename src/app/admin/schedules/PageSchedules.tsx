import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { getSchedules } from "@/services/APIs/schedules.apiServices";
import { Schedule } from "@/types/Schedule.types";
import { useEffect, useState } from "react";
import { columnsTableSchedules } from "./columnsTableSchedules";

export function PageSchedules() {
  const [listData, setListData] = useState<Schedule[]>([]);

  const fetchListData = async () => {
    const data = await getSchedules();
    console.log(">>> data: ", data);
    setListData(data);
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Schedules</h2>
        <Button onClick={fetchListData}>Fetch Schedules</Button>
        <DataTable
          data={listData}
          columns={columnsTableSchedules}
          filterSearchByColumn="order_date"
        />
      </div>
    </div>
  );
}
