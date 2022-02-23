import { Switch } from "react-router-dom";

import { AuthProvider } from "./context/auth";

import Account from "./pages/Account";
import DeleteUser from "./pages/DeleteUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import UpdateUser from "./pages/UpdateUser";

import AuthRoute from "./utils/AuthRoute";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <AuthRoute exact path="/" authenticated component={Home} />
        <AuthRoute path="/tasks" authenticated component={Task} />
        <AuthRoute exact path="/account" authenticated component={Account} />
        <AuthRoute
          path="/account/update"
          authenticated
          component={UpdateUser}
        />
        <AuthRoute
          path="/account/delete"
          authenticated
          component={DeleteUser}
        />
        <AuthRoute path="/login" guest component={Login} />
        <AuthRoute path="/register" guest component={Register} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
