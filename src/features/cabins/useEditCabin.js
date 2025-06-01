import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEditCabin } from "../../services/apiCabins";
import { toast } from "react-toastify";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editedCabin } = useMutation({
    mutationFn: ({ editedCabin, editedCabinId }) =>
      insertEditCabin(editedCabin, editedCabinId),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      // Invalidate the cabins query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isEditing, editedCabin };
}
