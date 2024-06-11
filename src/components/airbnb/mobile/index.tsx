// React imports
import { useState } from 'react';

// App imports
import { Carousel, CarouselItem } from './carousel';
import { Header } from './header';
import { Rooms } from './rooms';
import { Prices } from './prices';
import { Timeseries } from './timeseries';
import { Description } from './description';
import './styles.scss';

// Context imports
import { usePricesApi } from '../context/api/imoveis/prices';
import { usePrices } from '../context/filters/prices';

export const Mobile = () => {
	const [ activeIndex, setActiveIndex ] = useState(0);
	const { pricesData } = usePricesApi();
	const { unitPrice } = usePrices();
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
					<div></div>
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