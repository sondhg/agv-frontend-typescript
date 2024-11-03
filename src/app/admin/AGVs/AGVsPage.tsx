import { useEffect, useState } from "react";
import { getAllAGVs } from "../../../services/apiServices";
import { FormAGVs } from "./components/FormAGVs";
import { TableAGVs } from "./components/TableAGVs";

export function AGVsPage() {
  const [listAGVs, setListAGVs] = useState([]);

  const fetchListAGVs = async () => {
    const res = await getAllAGVs();
    console.log(">>> res: ", res);
    setListAGVs(res);
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
