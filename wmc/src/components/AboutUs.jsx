import Navbar from './Navbar'
import snowb from './img/snowboardPow.jpg'
import surf from './img/surfing.png'
import wakeb from './img/wakeboarding.jpg'
import './index.css'

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div id="aboutus">
        <h1>About Us</h1>
        <p>It started in a garage in 2009. Three longtime friends — a snowboarder, a surfer, and a skater — kept running into the same problem: finding boards that were actually built for people who lived on them. Not display pieces. Not beginner blanks. Real, serious gear. 
          <br /> <br /> So they stopped looking and started building. The first year, they hand-shaped a handful of boards out of that same garage, selling them to friends and local crews. Word spread the way it always does in board culture — fast and loud. </p>
        <p id="phrases">
          Whether you're dropping into your first halfpipe or hunting a new big-wave gun, we're here because this is who we are. It's not a side hustle. It's a calling.
        </p>
        <p>
          <br /> <br /> Today we carry snowboards, surfboards, skateboards, wakeboards, and everything in between — sourced from the best shapers and brands across the globe, alongside our own in-house line that still carries the spirit of that original garage build.
          <br /> <br /> We're not a department store that happens to sell boards. We're riders who happen to run a shop. Every product we stock has been tested on real terrain, real water, real concrete — by us, our team, and our community. If it doesn't earn its place on our floor, it doesn't make it in.
          <br /> <br /> Whether you're dropping into your first halfpipe or hunting a new big-wave gun, we're here because this is who we are. It's not a side hustle. It's a calling.
        </p>
        <img src={snowb} alt="Snowboard" id="snowbpow" />
        <img src={surf} alt="Surf" id="surf" />
        <img src={wakeb} alt="Wakeboard" id="wakeb" />
      </div>
    </>
  )
}

export function showImage() {
  return (
  <>
    
  </>
  )
}
/* scrolling doesn't work */