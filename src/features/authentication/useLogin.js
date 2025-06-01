import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),

    onSuccess: (data) => {
      toast.success("Login successful:");
      navigate("/dashboard");
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isPending };
}
