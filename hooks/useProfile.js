import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export function useProfile() {
  return useSWR("/api/users/me", fetcher);
}
