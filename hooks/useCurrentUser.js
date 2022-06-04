import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

  export function useCurrentUser() {
    return useSWR("/api/user", fetcher);
  }