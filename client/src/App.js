import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Main from "./page/MainPage/Main";
import Select from "./page/SelectPage/Select";
import {AnimatePresence} from "framer-motion";


function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <BrowserRouter>
         <Switch>
             <Route exact path = '/' component={Main}/>
             <Route exact path = '/select' component={Select}/>
         </Switch>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

export default App;
