import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const lastDays = searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), lastDays).toISOString();
  const { isPending, data: recentBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${lastDays}`],
  });
  return { isPending, recentBookings };
}
