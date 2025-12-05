
import React from 'react';
import Bimo from './popup/bimo/bimo';
import Candy from './popup/candy/candy';
import Cloud from './popup/cloud/cloud';
import Jayk from './popup/jayk/jayk';
import King from './popup/king/king';
import Marceline from './popup/marceline/marceline';
import Sandy from './popup/sandy/sandy';
import Lichhome from './popup/thelich/lichhome';
import './App2.css';

function App() {
  return (
    <div className="background">
      <img src="ciclogo.png" alt="" id='mainciclogo' />
      <button id='Games' >Choose Your Game</button>
      <img src="background.jpg" alt="background" id='backgroundimg'/>
      <img src="mainbimo.png" alt="mainbimo" id='mainbimo' />
      <img src="enchrdbook.png" alt="enchrbook" id='enchrbook'/>
      <div className="pop-ups">
        <Candy/>
        <Marceline/>
        <Lichhome/>
        <Jayk/>
        <King/>
        <Bimo/>
        <Cloud/>
        <Sandy/>
      </div>
    </div>
  );
}

export default App;