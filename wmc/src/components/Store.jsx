import Navbar from './Navbar'
import './index.css'

export default function Store() {
  return (
    <>
      <Navbar />
      <div id="store">
        <div className="page-headers">
          <h1 id="page-headers">Our Products</h1>
          <p>This is your store page. Add your products here.</p>
        </div>
        
      </div>
    </>
  )
}
