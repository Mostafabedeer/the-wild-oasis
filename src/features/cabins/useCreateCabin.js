import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { insertEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  // Create a new cabin
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: insertEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      // Invalidate the cabins query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreating, createCabin };
}
