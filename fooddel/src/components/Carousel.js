import React from 'react'

export default function carousel() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{"zIndex":"10"}}>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div>
    <div className="carousel-item active">
      <img src="https://cdn.wallpapersafari.com/89/18/XU6N8r.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://15ad.in/wp-content/uploads/2018/09/rich-truffle-pastry-300x300-1.png" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://content.jdmagicbox.com/comp/ahmedabad/r1/079pxx79.xx79.180824144437.j4r1/catalogue/la-pino-z-pizza-nikol-gam-ahmedabad-pizza-outlets-ghgflqwyly-250.jpg" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}
