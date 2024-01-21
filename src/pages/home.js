import React from 'react'
import { Tabs } from './tabs'

function Home({ setDisplayTabs, displayTabs, connectWallets }) {
  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-evenly '>
        <div className='col-md-3'>
          <button className={displayTabs == 0 ? "btn btn-stake-active mt-2 mb-3" : "btn btn-Stake mt-2 mb-3"} onClick={() => setDisplayTabs(0)}>Whitelist Button</button>
        </div>
        <div className='col-md-3'>
          <button className={displayTabs == 1 ? "btn btn-stake-active mt-2 mb-3" : "btn btn-Stake mt-2 mb-3"} onClick={() => setDisplayTabs(1)}>Batch Giving 30% Bonus</button>
        </div>
        <div className='col-md-3'>
          <button className={displayTabs == 2 ? "btn btn-stake-active mt-2 mb-3" : "btn btn-Stake mt-2 mb-3"} onClick={() => setDisplayTabs(2)}>Batch Giving 20% Bonus</button>
        </div>
      </div>


      <div className='row '>
        <div className='col-md-12'>
          {
            displayTabs == 0? 
            <Tabs displayTabs={displayTabs} connectWallets={connectWallets}/> : 
            displayTabs == 1 ? <Tabs displayTabs={displayTabs} connectWallets={connectWallets}/> : 
            <Tabs displayTabs={displayTabs} connectWallets={connectWallets}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Home