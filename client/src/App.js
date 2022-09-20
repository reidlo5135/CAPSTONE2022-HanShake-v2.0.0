import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Main from "./page/MainPage/Main";
import Select from "./page/SelectPage/Select";
import Food from "./page/FoodPage/Food";
import Calendar from "./page/CalendarPage/Calendar";
import Campus from "./page/CampusPage/campus";
import {AnimatePresence} from "framer-motion";
import CampusDetail from './page/CampusPage/campusDetail';

function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <BrowserRouter>
         <Switch>
             <Route exact path = '/' component={Main}/>
             <Route exact path = '/select' component={Select}/>
             <Route exact path = '/food' component={Food}/>
             <Route exact path = '/calendar' component={Calendar}/>
             <Route exact path = '/campus' component={Campus}/>
             <Route exact path = '/campusdetail' component={CampusDetail}/>
         </Switch>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

export default App;
