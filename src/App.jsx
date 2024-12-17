import React, { useEffect, useRef, useState } from "react"
import { data } from './assets/data'

function App() {
  // referencia a la etiqueta
  const listRef = useRef();

  // el index actual del item
  const [currentIdex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIdex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      })
    }
  }, [currentIdex]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const firstSlide = currentIdex === 0;
        return firstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIdex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1)
      }
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <React.Fragment>
      <h1>Carousel Slider React JS</h1>
      <section className="main-container">
        <div className="slider-container">
          <div className="leftArrow" onClick={() => scrollToImage('prev')}>&#9754;</div>
          <div className="rightArrow" onClick={() => scrollToImage('next')}>&#9755;</div>

          <div className="container-images">
            <ul ref={listRef}>
              {
                data.map((item) => {
                  return <li key={item.id}>
                    <img src={item.imgUrl} alt="images" width={700} height={320} />
                  </li>
                })
              }

            </ul>
          </div>
          <div className="dots-container">
            {
              // data.map(( _, idx) => (
              data.map(( item, idx) => (
                <div key={idx}
                  className={`dot-container-item ${idx === currentIdex ? "active" : " "}`}
                  onClick={() => goToSlide(idx)}>
                  <img src={item.imgUrl} alt="" width={100} height={50}/>
                </div>))
            }
          </div>

        </div>
      </section>
    </React.Fragment>
  )
}

export default App


{/* <div className="dots-container">
{
  data.map((_, idx) => (
    <div key={idx}
      className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
      onClick={() => goToSlide(idx)}>
      &#9865;
    </div>))
}
</div> */}