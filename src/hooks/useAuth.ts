import { AuthContext } from "./../context/auth";
import { useContext } from "react";

export function useAuth() {
  const value = useContext(AuthContext);
  return value;
}
