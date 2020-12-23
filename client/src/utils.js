import {
  useLocation,
  listen
} from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}