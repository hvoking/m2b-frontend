// React imports
import { useState } from 'react';

// App imports
import { Carousel, CarouselItem } from './carousel';
import { Header } from './header';
import { Rooms } from './rooms';
import { Dsv } from './dsv';
import { Hist } from './hist';
import { Prices } from './prices';
import { Timeseries } from './timeseries';
import { Description } from './description';
import './styles.scss';

// Context imports
import { usePricesApi, usePrices, useCategory } from '../context';

export const Mobile = () => {
	const [ activeIndex, setActiveIndex ] = useState(0);
	const { pricesData } = usePricesApi();
	const { unitPrice } = usePrices();
	const { currentView } = useCategory();
;
	if (!pricesData) return (
		<Description/>		
	)

	return (
		<div className="bottom">
			<Header activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
			<Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
				<CarouselItem>
					<Rooms/>
				</CarouselItem>
				<CarouselItem>
					{currentView === "oferta" ? <Dsv/> : <Hist/>}
				</CarouselItem>
				<CarouselItem>
					<Timeseries/>
				</CarouselItem>
				<CarouselItem>
					<Prices pricesData={pricesData} unitPrice={unitPrice}/>
				</CarouselItem>
			</Carousel>
		</div>
	)
}

Mobile.displayName="Mobile"