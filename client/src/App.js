import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { useState } from 'react'

function App() {

  const [isHover, setIsHover] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);



  return (
    <>
      <div className="App">
        <div className={isHover ? "rocketButton" : footerVisible ? "heroFooter" : "hero"}>
          <NavBar setIsHover={setIsHover} setFooterVisible={setFooterVisible} ></NavBar>
        </div>
        <div className={isHover ? "rocketButton" : footerVisible ? "heroFooter" : "hero"}>
          <Footer></Footer>
        </div>
      </div>
    </>

  );
}

export default App;
