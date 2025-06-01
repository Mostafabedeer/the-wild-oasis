import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-toastify";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkingOut, isPending: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked out successfully!`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error("Something went wrong while checking out the booking.");
    },
  });

  return {
    checkingOut,
    isCheckingout,
  };
}
