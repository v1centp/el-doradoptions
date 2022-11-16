import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import MultipleForm from './MultipleForm';
import { VscRocket } from 'react-icons/vsc';

import './../App.css'

function NavBar({ setIsHover }) {
  const elrefe = useRef(null)

  function handleClick() {
    elrefe.current?.scrollIntoView({ behavior: 'smooth' })
    setformVisible(!formVisible)
    setButtonVisible(!ButtonVisible)
  }

  const [formVisible, setformVisible] = useState(false);
  const [ButtonVisible, setButtonVisible] = useState(true);

  function darkModeFunctionOn() {
    setIsHover(true)
  }

  function darkModeFunctionOff() {
    setIsHover(false)
  }




  return (
    <>
      <div>
        <div className="NavBar">
          {/* <h2>Find the nugget with</h2> */}
          <h1>El Dorado<span className="spanOptions">ptions</span></h1>

          <> {ButtonVisible &&
            <Stack className="startButton" spacing={2} direction="row">
              <Button onClick={handleClick} variant="contained">Begin</Button>
            </Stack>}
            <div className="rocketContainer">
              <span>< VscRocket onMouseEnter={darkModeFunctionOn} onMouseLeave={darkModeFunctionOff} size={90} className="rocket" /></span>
            </div>
          </>
        </div>
        <div ref={elrefe}></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="1" d="M0,192L18.5,170.7C36.9,149,74,107,111,112C147.7,117,185,171,222,202.7C258.5,235,295,245,332,234.7C369.2,224,406,192,443,160C480,128,517,96,554,101.3C590.8,107,628,149,665,154.7C701.5,160,738,128,775,112C812.3,96,849,96,886,112C923.1,128,960,160,997,176C1033.8,192,1071,192,1108,197.3C1144.6,203,1182,213,1218,208C1255.4,203,1292,181,1329,165.3C1366.2,149,1403,139,1422,133.3L1440,128L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path>hello</svg>
        <MultipleForm formVisible={formVisible} />
      </div>
    </>
  )
}

export default NavBar