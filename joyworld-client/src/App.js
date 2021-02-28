import './App.css';
import SessionContext from './contexts/SessionContext';
import CartContext from './contexts/CartContext';


import Container from './components/Container/Container';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import { useEffect, useState } from 'react';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import ScrollTopArrow from './components/ScrollTopArrow/ScrollTopArrow';
import jwtDecode from 'jwt-decode'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem('user-data'));
  const [cart, updateCart] = useState([]);

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  useEffect(() => {
    const init = () => {
      let decode;
      if(JSON.parse(localStorage.getItem('user-data'))) decode = jwtDecode(JSON.parse(localStorage.getItem('user-data')).token)
      if(decode?.exp < Date.now()/1000) {
        localStorage.removeItem('user-data')
        setAuthenticated(false)
      } 
    }
    init();
  },[])


  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prevState) => !prevState)
  }

  const backdropClickHandler = () => {
    setSideDrawerOpen(false)
  }

  return (
        <SessionContext.Provider
          value={{
              isAuthenticated,
              setAuthenticated,
          }}
        >
            <CartContext.Provider
              value={{
                cart,
                updateCart,
              }}
            >
                <Container>
                <Header drawerClickHandler={drawerToggleClickHandler} />
                <SideDrawer show={sideDrawerOpen}/>
                {sideDrawerOpen && <Backdrop onClick={backdropClickHandler}/>}
                <ScrollTopArrow/>
                <Content />
                <Footer />
              </Container>
            </CartContext.Provider>
        </SessionContext.Provider>
  );
}

export default App;
