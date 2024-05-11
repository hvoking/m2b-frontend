// React imports
import { Children, cloneElement } from 'react';

// App imports
import './styles.scss';

export const CarouselItem = ({children, width}: any) => {
	return (
		<div className="carousel-item" style={{width: width}}>
			{children}
		</div>
	)
}

export const Carousel = ({children, activeIndex, setActiveIndex}: any) => {
	const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    }
    else if (newIndex >= Children.count(children)) {
      newIndex = Children.count(children) - 1
    }
    setActiveIndex(newIndex)
  }

  const decrement = () => updateIndex(activeIndex - 1);
  const increment = () => updateIndex(activeIndex + 1);

	return (
    <div className="inner-wrapper">
      <span className="mobile-arrow-left" onClick={decrement}/>
        <div className="carousel">
          <div className="inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
            {
              Children.map(children, (child, index) => {
                return cloneElement(child, {width: "100%"});
              })
            }
          </div>
        </div>
      <span className="mobile-arrow-right" onClick={increment}/>
    </div>
	)
}