import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './component/navbar';
import Home from './pages/home';
import { useState } from 'react';
function App() {
  const [displayTabs, setDisplayTabs] = useState(0)
  const [connectWallets, setConnectWallets] = useState("Connect Wallet");
  return (
    <div className="App ">
      <div className='app-down'>
        
        <Navbars setConnectWallets={setConnectWallets}/>
         <Home setDisplayTabs={setDisplayTabs} displayTabs={displayTabs} connectWallets={connectWallets}/>

      </div>
    </div>
  );
}

export default App;
