import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { updateUserData } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateUserData(fullName, password, avatar),
    onSuccess: () => {
      toast.success("User data updated successfully");
      // Invalidate the user query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateUser };
}
