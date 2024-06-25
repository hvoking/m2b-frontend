// React imports
import { useEffect } from 'react';

// App imports
import { Header } from './header';
import { Body } from './body';
import './styles.scss';

// Context imports
import { usePricesApi } from '../context/api/imoveis/prices';
import { usePropertyType } from '../context/filters/property';
import { usePrices } from '../context/filters/prices';
import { useDates } from '../context/filters/dates';
import { useTooltip } from '../context/maps/tooltip';
import { useLinesLimits } from '../context/limits/lines';

export const Right = () => {
	const { pricesData } = usePricesApi();

	const { rejectedIds, setRejectedIds, nearest, setNearest, activeEquipment, setCurrentPropertyId, setSamplesIds } = usePropertyType();
	const { setSamplesPrices, leftPosition, rightPosition } = usePrices();
	const { startDate, finalDate } = useDates();
	const { setPropertyInfo, setActivePropertyInfo } = useTooltip();
	const { bottomLimit, topLimit } = useLinesLimits();

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const filterByPrices = pricesData && pricesData.filter((d: any) => {
		return (leftPosition < d['price'] && d['price'] < rightPosition)
	});

  	const filterPoints = filterByPrices && filterByPrices.filter((d: any) => {  		
  		return currentStartDate < new Date(d.start_date) && new Date(d.start_date) < currentFinalDate
  	});

	const filterById = filterPoints && filterPoints.filter((item: any) => !rejectedIds.includes(item.property_id))

	useEffect(() => {
		filterById && setSamplesPrices(filterById.slice(0, nearest).map((item: any) => item['price']));
		filterById && setSamplesIds(filterById.slice(0, nearest).map((item: any) => item['property_id']))
	}, [ 
		rejectedIds, activeEquipment, 
		leftPosition, rightPosition, 
		startDate, finalDate,
	]);

	return (
		<div className="airbnb-right">
			<Header nearest={nearest} setNearest={setNearest}/>
			<div className="airbnb-images-wrapper">
				{filterById && filterById.slice(0, nearest).map((item: any, index: any) => {
					const currentImage = item.image_src && item.image_src;
					return (
						<Body 
							item={item} 
							setRejectedIds={setRejectedIds} 
							setCurrentPropertyId={setCurrentPropertyId}
							setPropertyInfo={setPropertyInfo} 
							setActivePropertyInfo={setActivePropertyInfo}
							currentImage={currentImage}
							textColor={ 
								item['price'] < bottomLimit ? 
								"rgba(255, 0, 0, 1)" :
								item['price'] > topLimit ? 
								"rgba(166, 166, 244, 1)" :
								"rgba(67, 181, 64, 1)"
							}
							backgroundColor = {
								item['price'] < bottomLimit ? 
								"rgba(68, 27, 30, 1)" :
								item['price'] > topLimit ? 
								"rgba(42, 43, 96, 1)" :
								"rgba(21, 59, 39, 1)"
							}
						/>
					)}
				)}
			</div>
		</div>
	)
}

Right.displayName="Right";