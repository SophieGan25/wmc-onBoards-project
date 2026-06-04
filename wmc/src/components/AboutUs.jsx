import Navbar from './Navbar'
import Impressum from './Impressum'
import snowb from './img/snowboardPow.jpg'
import surf from './img/surfing.png'
import wakeb from './img/wakeboarding.jpg'
import kidssnow from './img/kidsSnow.png'
import surfcamp from './img/surfCamp.jpg'
import './index.css'

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div id="aboutus">
        <div className="page-headers">
          <h1 className="page-title">About Us</h1>
          <p>Find out about our journey since 2026.</p>
        </div>
        
        <div className="text-content">
          <p>It started in my mind in 2016. I was six years old and I've always, so for two years at that time, wanted to snowboard just like my dad. 
            <br /> <br /> So I had private lessons in winter 2016 for a week and i was hooked. This was the start of my passion for snowboarding. 
            I used to do as many runs until my legs would almost fall off. I was so obsessed with snowboarding that I wanted to do it all year round.
            <br /> <br /> In the summer of 2019, I tried wakeboarding and I was fascinated by it. The feeling of being on the water was almost as incredible as being on the snow.
            <br /> <br /> In summer 2024, I tried surfing for the first time, and although I didn't get the hang of it fully yet, this hobby proceeded in spring 2026 when my dad and I decided to take a surfing course in Portugal. 
            <br /><br /> And In future U want to try out kitesurfing and windsurfing as well, so there is plenty of board sports to try out and to get into.
            <br /><br /> So i decided to build my website around my passion for board sports.
          </p>
          <div className="images-container">
            <img src={kidssnow} alt="kidssnow" className="imgAbt" />
          </div>
          <p id="phrases">
            <br /> <br /> Whether you're dropping into your first halfpipe or hunting a new big-wave gun, we're here because this is who we are. It's not a side hustle. It's a calling.
          </p>
          <p>
            <br /> <br /> Today I carry snowboards, surfboards, skateboards, wakeboards, and everything in between — sourced from the best shapers and brands across the globe, alongside our own in-house line that still carries the spirit of that original garage build.
            <br /> <br /> We're not a department store that happens to sell boards. We're riders who happen to run a shop. Every product we stock has been tested on real terrain, real water, real concrete — by us, our team, and our community. If it doesn't earn its place on our floor, it doesn't make it in.
          </p>
        </div>
        <div className="images-container">
            <img src={surfcamp} alt="surfcamp" className="imgAbt" />
          </div>
      </div>
      <Impressum />
    </>
  )
}
