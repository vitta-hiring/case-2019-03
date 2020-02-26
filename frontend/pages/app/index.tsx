import { withAuthSync, auth, logout } from "../../utils/auth";
import { useRouter, Router } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "../../store/ducks/rootReducer";

const Application = ({ token, userInfo }) => {
  const router = useRouter();
  const authState = useSelector((state: AppState) => state.auth);

  if (authState.isLogged) {
    if (process.browser) {
      router.push("/app/prescriptions");
    }
  } else {
    if (process.browser) logout();
  }

  return null;
};

export default withAuthSync(Application);
