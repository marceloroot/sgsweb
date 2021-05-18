import React,{Suspense,lazy} from 'react';

import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import {CircularProgress} from '@material-ui/core';
const Login =  lazy (() => import ('./view/pages/login'));
const Equipamento =  lazy (() => import ('./view/pages/equipamento/edit'));
const Routes = () =>(
    <Router>
        <Suspense fallback={<div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress /></div>}>
              <Switch>
                  <Route path="/login" exact component={Login} />
                  <Route path="/equipamento" exact component={Equipamento} />
              </Switch>
        </Suspense>
    </Router>
);

export default Routes;