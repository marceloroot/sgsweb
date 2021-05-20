import React,{Suspense,lazy} from 'react';

import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import {CircularProgress} from '@material-ui/core';
const Login =  lazy (() => import ('./view/pages/login'));

const Equipamento =  lazy (() => import ('./view/pages/equipamento/edit'));
const Equipamentos =  lazy (() => import ('./view/pages/equipamento/index'));

const Beneficio =  lazy (() => import ('./view/pages/beneficio/edit'));
const Beneficios =  lazy (() => import ('./view/pages/beneficio/index'));

const Usuario =  lazy (() => import ('./view/pages/usuario/edit'));
const Usuarios =  lazy (() => import ('./view/pages/usuario/index'));

const Permissoes =  lazy (() => import ('./view/pages/usuario/permissoes'));

const Routes = () =>(
    <Router>
        <Suspense fallback={<div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress /></div>}>
              <Switch>
                  <Route path="/login" exact component={Login} />
                  <Route path="/equipamento" exact component={Equipamento} />
                  <Route path="/equipamento/:id" exact component={Equipamento} />
                  <Route path="/equipamentos" exact component={Equipamentos} />

                  {/*Beneficios*/}
                  <Route path="/beneficio" exact component={Beneficio} />
                  <Route path="/beneficio/:id" exact component={Beneficio} />
                  <Route path="/beneficios" exact component={Beneficios} />

                  {/*Usuario*/}
                  <Route path="/usuario" exact component={Usuario} />
                  <Route path="/usuario/:id" exact component={Usuario} />
                  <Route path="/usuarios" exact component={Usuarios} />

                  {/*Permissao*/}
                  <Route path="/permissoes/:id" exact component={Permissoes} />

              </Switch>
        </Suspense>
    </Router>
);

export default Routes;