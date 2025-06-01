import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PageSize } from "../../constant/constant";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy");
  const pageValue = searchParams.get("page");

  // 1) Sort
  const sort =
    !sortValue || sortValue === "startDate-desc"
      ? null
      : {
          field: sortValue.split("-")[0],
          order: sortValue.split("-")[1],
        };

  // 2) Filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // 3) Pagination
  const page = pageValue ? Number(pageValue) : 1;

  // 4) Fetch Query bookings
  const {
    data: { data: bookings = [], count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  //5) Pre-fetching
  const pageCount = Math.ceil(count / PageSize);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  }

  return { bookings, count, isPending, error };
}
