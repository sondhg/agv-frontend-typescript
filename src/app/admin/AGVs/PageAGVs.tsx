import { useEffect, useState } from "react";
import { getAGVs } from "@/services/APIs/AGVs.apiServices";
import { FormAGVs } from "./FormAGVs";
import { TableAGVs } from "./TableAGVs";

export function PageAGVs() {
  const [listAGVs, setListAGVs] = useState([]);

  const fetchListAGVs = async () => {
    const data = await getAGVs();
    console.log(">>> data: ", data);
    setListAGVs(data);
  };

  useEffect(() => {
    fetchListAGVs();
  }, []);

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">AGVs</h2>
        <FormAGVs fetchListAGVs={fetchListAGVs} />
        <TableAGVs listAGVs={listAGVs} fetchListAGVs={fetchListAGVs} />
      </div>
    </div>
  );
}
