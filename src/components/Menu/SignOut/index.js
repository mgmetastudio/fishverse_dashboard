import { useHistory } from "react-router";
import { back } from "../../../constants/svg";

const style = {
  "color": "#FF8282",
  "cursor": "pointer",
  "textAlign": "left",
  "padding": "12px 15px",
  "fontWeight": "600"
}

const SignOut = (props) => {
  const history = useHistory();

  const logout = async () => {
    localStorage.setItem("accessToken", "")
    history.push("/")
  }

  return (
    <>
      <button onClick={e => logout()} style={style}>{back}Sign out</button>
    </>
  );
};

export default SignOut;