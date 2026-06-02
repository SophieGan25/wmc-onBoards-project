import Navbar from './Navbar'
import Impressum from './Impressum'
import './index.css'


export default function Home() {
  return (
    <>
      <Navbar />
      <div id="home">
        <div className="page-headers">
          <h1 className="page-title">Welcome to onBoards</h1>
          <p>Indulge into an extrodinary sport experience</p>
          <p>Let us guide you through your board-journey</p>
        </div>
      </div>
    </>
  )
}
