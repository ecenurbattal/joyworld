import './App.css';
import SessionContext from './contexts/SessionContext';
import CartContext from './contexts/CartContext';


import Container from './components/Container/Container';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import { useState } from 'react';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import ScrollTopArrow from './components/ScrollTopArrow/ScrollTopArrow';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [cart, updateCart] = useState([]);

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

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
              user,
              setUser,
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
