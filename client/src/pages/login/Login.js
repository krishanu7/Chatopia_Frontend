import { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom"; 
export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate(); 
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  const handleRegisterClick = () => {
    navigate("/register");
};
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chatopia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chatopia.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                "Log In"
              )}
            </button>
            <button className="loginRegisterButton" onClick={handleRegisterClick}>
              {isFetching ? (
                <CircularProgress color="primary" size={20} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
