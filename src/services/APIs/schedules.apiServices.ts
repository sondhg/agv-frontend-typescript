import { Schedule } from "@/types/Schedule.types";
import api from "@/utils/axiosCustomize";

const SCHEDULES_URL = "/schedules";

const getSchedules = async (): Promise<Schedule> => {
  try {
    const { data } = await api.get(`${SCHEDULES_URL}/`);
    return data;
  } catch (error) {
    console.error(">>> Error fetching schedules:", error);
    throw new Error(">>> Failed to fetch schedules");
  }
};

export { getSchedules };
