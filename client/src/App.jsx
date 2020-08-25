import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import InstitutionDetailPage from "./routes/InstitutionDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { InstitutionContextProvider } from "./context/InstitutionContext";

const App = () => {
  return (
    <InstitutionContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/institution/:id/update"
              component={UpdatePage}
            />
            <Route
              exact
              path="/institution/:id"
              component={InstitutionDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </InstitutionContextProvider>
  );
};

export default App;
