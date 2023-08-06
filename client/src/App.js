import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Messenger /> : <Register />} />
        <Route path="/login" element={user ? <Messenger /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Link to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
};

export default App;
