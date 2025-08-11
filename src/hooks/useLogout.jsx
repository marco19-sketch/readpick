import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

export function useLogout() {
const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return logout;
}
