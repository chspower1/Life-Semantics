import customApi from "@/utils/customApi";
import { useQuery } from "@tanstack/react-query";

interface User {
  name: string;
  accountId: string;
  id: number;
}
const useUser = () => {
  const { getApi } = customApi("/me");
  const { data } = useQuery<User>(["user"], getApi);

  return data;
};
export default useUser;
