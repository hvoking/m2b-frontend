// React imports
import { useState, useEffect } from 'react';

// App imports
import { Header } from './header';
import { Pictures } from './pictures';
import { Description } from './description';
import './styles.scss';

// Context imports
import { usePropertyType, usePrices, useDates, usePricesLimits } from '../context';

export const Listing = () => {
	const [ validImages, setValidImages ] = useState<any>({});

	const { rejectedIds, setRejectedIds, nearest, setNearest, activeEquipment, setCurrentPropertyId, setSamplesIds } = usePropertyType();
	const { setSamplesPrices, leftPosition, rightPosition } = usePrices();
	const { formatedStartDate, formatedFinalDate } = useDates();
	const { filterPoints } = usePricesLimits();

	const filterById = filterPoints && filterPoints.filter((item: any) => !rejectedIds.includes(item.property_id))

	useEffect(() => {
		filterById && setSamplesPrices(filterById.slice(0, nearest).map((item: any) => item['price']));
		filterById && setSamplesIds(filterById.slice(0, nearest).map((item: any) => item['property_id']))
	}, [ 
		rejectedIds, activeEquipment, 
		leftPosition, rightPosition, 
		formatedStartDate, formatedFinalDate,
	]);

	const onMouseOver = (e: any, item: any) => {
		setCurrentPropertyId(item.property_id);
	}

	return (
		<div className="airbnb-listing">
			<Header nearest={nearest} setNearest={setNearest}/>
			<div className="airbnb-images-wrapper">
				{filterById && filterById.filter((item: any) => validImages[item.property_id] !== false).slice(0, nearest).map((item: any, index: any) => {
					return (
						<div 
							key={index} 
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

Listing.displayName="Listing";