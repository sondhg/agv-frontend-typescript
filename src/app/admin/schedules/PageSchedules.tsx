import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllSchedules } from "../../../services/apiServices";
import { TableSchedules } from "./components/TableSchedules";

export function PageSchedules() {
  const [listSchedules, setListSchedules] = useState([]);

  const fetchListSchedules = async () => {
    let response = await getAllSchedules();
    console.log(">>> response: ", response);
    setListSchedules(response);
  };

  useEffect(() => {
    fetchListSchedules();
  }, []);

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Schedules</h2>
        <Button onClick={fetchListSchedules}>Fetch Schedules</Button>
        <TableSchedules /* listSchedules={listSchedules} */ />
      </div>
    </div>
  );
}
