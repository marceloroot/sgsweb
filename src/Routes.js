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

const Pessoa =  lazy (() => import ('./view/pages/pessoa/edit'));
const Pessoas =  lazy (() => import ('./view/pages/pessoa/index'));

const Familiar =  lazy (() => import ('./view/pages/familiar/edit'));
const Familiares = lazy (() => import ('./view/pages/familiar/index'));

const BeneficiosFamilias = lazy (() => import ('./view/pages/pessoa/beneficiosfamiliares'));

const Entrega = lazy (() => import ('./view/pages/entrega/edit'));
const Entregas = lazy (() => import ('./view/pages/entrega/index'));

const Emissao = lazy (() => import ('./view/pages/entrega/emissao'));

const Routes = () =>(
    <Router>
        <Suspense fallback={<div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress /></div>}>
              <Switch>
            
                 
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

                   {/*Pessoa*/}
                   <Route path="/familia/" exact component={Pessoa} />
                   <Route path="/familia/:id" exact component={Pessoa} />
                   <Route path="/familias" exact component={Pessoas} />

                   
                   {/*Familiar*/}
                   <Route path="/familiar/:idchefe" exact component={Familiar} />
                   <Route path="/familiar/:id/chefe/:idchefe" exact component={Familiar} />
                   <Route path="/familiares/:id" exact component={Familiares} />

                  {/*beneficioporfamilia*/}
                  <Route path="/showbeneficios/:id" exact component={BeneficiosFamilias} />

                  {/*Entrega*/}
                  <Route path="/entrega/:id" exact component={Entrega} />
                  <Route path="/entregas/:id" exact component={Entregas} />

                  <Route path="/emissao/:id" exact component={Emissao} />
                    
                  <Route path="/login" exact   component={Login} />
                  <Route path="/"   component={Login} />

              </Switch>
        </Suspense>
    </Router>
);

export default Routes;