import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./index.css"
import { loadWeb3 } from '../../utils/Api/api';
function Navbars({setConnectWallets}) {
    const [address, setAddress] = useState("Connect Wallet");
    const handleConnect = async () => {
        try {
          let acc = await loadWeb3();
          if (acc === "No Wallet") {
            // setConnectWallet("No Wallet");
            setAddress("Wrong Network");
          } else if (acc === "Wrong Network") {
            // setConnectWallet("Wrong Network");
            setAddress("Wrong Network");
          } else {
            setAddress(acc.substring(0, 4) + "..." + acc.substring(acc.length - 4))
            setConnectWallets(acc)
          }
        } catch (err) {
          console.log("err", err);
        }
      }
  return (
    <Navbar  expand="lg" className="p-4">
      <Container>
        <Navbar.Brand href="#home" className='logo-text'>MINTING-DAPP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            <button className='btn btn-connect' onClick={handleConnect}>{address}</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars