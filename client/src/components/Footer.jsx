import './../App.css'

function Footer() {
  return (
    <>
      <div className='FooterContainer'>
        <svg className="layer1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="1" d="M0,160L30,165.3C60,171,120,181,180,160C240,139,300,85,360,58.7C420,32,480,32,540,74.7C600,117,660,203,720,224C780,245,840,203,900,170.7C960,139,1020,117,1080,128C1140,139,1200,181,1260,181.3C1320,181,1380,139,1410,117.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
        <div className="layer2">
          by Vincent Porret @{new Date().getFullYear()}
        </div>
      </div>
    </>
  )
}

export default Footer