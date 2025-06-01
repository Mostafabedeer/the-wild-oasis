import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi(email, password, fullName),
    onSuccess: (data) => {
      toast.success("Signup successful! ");

      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signup, isPending };
}
