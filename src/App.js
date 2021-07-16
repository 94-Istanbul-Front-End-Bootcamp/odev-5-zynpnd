import "bootstrap/dist/css/bootstrap.min.css";
import { TheLayout } from "./container";
import { Login } from "./view";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.css";
import { useState } from "react";

const App = () => {
  let initialLoggin = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [isLoggedIn, setisLoggedIn] = useState(initialLoggin || null);

  return (
    <Router>
      <Switch>
        <Route exact path="/404">
          <div>404</div>
        </Route>
        <Route exact path="/login">
          <Login setisLoggedIn={setisLoggedIn} />
        </Route>

        {isLoggedIn === true ? (
          <Route path="/">
            <TheLayout />
          </Route>
        ) : null}

        <Redirect from="*" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
