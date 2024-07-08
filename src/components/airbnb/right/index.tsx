// React imports
import { useState, useEffect } from 'react';

// App imports
import { Header } from './header';
import { Pictures } from './pictures';
import { Description } from './description';
import './styles.scss';

// Context imports
import { usePricesApi } from '../context/api/imoveis/prices';
import { usePropertyType } from '../context/filters/property';
import { usePrices } from '../context/filters/prices';
import { useDates } from '../context/filters/dates';

export const Right = () => {
	const [ validImages, setValidImages ] = useState<any>({});

	const { pricesData } = usePricesApi();
	const { rejectedIds, setRejectedIds, nearest, setNearest, activeEquipment, setCurrentPropertyId, setSamplesIds } = usePropertyType();
	const { setSamplesPrices, leftPosition, rightPosition } = usePrices();
	const { startDate, finalDate } = useDates();

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

	const onMouseOver = (e: any, item: any) => {
		setCurrentPropertyId(item.property_id);
	}

	return (
		<div className="airbnb-right">
			<Header nearest={nearest} setNearest={setNearest}/>
			<div className="airbnb-images-wrapper">
				{filterById && filterById.filter((item: any) => validImages[item.property_id] !== false).slice(0, nearest).map((item: any, index: any) => {
					return (
						<div 
							key={index} 
							className="airbnb-description-wrapper" 
							onMouseOver={(e: any) => onMouseOver(e, item)}
						>
							<Pictures
								item={item}
								setValidImages={setValidImages}
								setRejectedIds={setRejectedIds}
							/>
							<Description item={item}/>
						</div>
						)}
					)}
				</div>
			</div>
		)
	}

Right.displayName="Right";