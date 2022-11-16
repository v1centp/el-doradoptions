import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { useState } from 'react'

function App() {

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div className='bigContainer'></div>
      <div className={isHover ? "rocketButton" : "rocketButtonOff"}>
        <NavBar setIsHover={setIsHover}></NavBar>
        <Footer></Footer>
      </div>
    </>

  );
}

export default App;
