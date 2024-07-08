// React imports
import { useState, useEffect } from 'react';

// App imports
import { Header } from './header';
import './styles.scss';

// Context imports
import { usePricesApi } from '../context/api/imoveis/prices';
import { usePropertyType } from '../context/filters/property';
import { usePrices } from '../context/filters/prices';
import { useDates } from '../context/filters/dates';
import { useTooltip } from '../context/maps/tooltip';
import { useLinesLimits } from '../context/limits/lines';

export const Right = () => {
	const [ validImages, setValidImages ] = useState<any>({});

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

	const rejectId = (e: any, item: any) => {
		e.stopPropagation();
		const currentValue = item.property_id;
		setRejectedIds((prev: any) => [...prev, currentValue]);
	}

	const handleImageLoad = (id: any) => {
	    setValidImages((prev: any) => ({ ...prev, [id]: true }));
	  };

	const handleImageError = (id: any) => {
		setValidImages((prev: any) => ({ ...prev, [id]: false }));
	};

	const onMouseOver = (e: any, item: any) => {
		setCurrentPropertyId(item.property_id);
	}

	

	return (
		<div className="airbnb-right">
			<Header nearest={nearest} setNearest={setNearest}/>
			<div className="airbnb-images-wrapper">
				{filterById && filterById.filter((item: any) => validImages[item.property_id] !== false).slice(0, nearest).map((item: any, index: any) => {
					const currentImage = item.image_src && item.image_src;
					return (
								<div key={index} className="airbnb-description-wrapper" onMouseOver={(e: any) => onMouseOver(e, item)}>
									 <div 
									 	className="listing-container" 
									 	style={{
									 		backgroundColor: 
									 			item['price'] < bottomLimit ? 
									 			"rgba(68, 27, 30, 1)" :
									 			item['price'] > topLimit ? 
									 			"rgba(42, 43, 96, 1)" :
									 			"rgba(21, 59, 39, 1)"
									 	}}
									 >
									 	<div style={{position: "relative"}}>
									 		<img 
									 		 	src={currentImage}
									 		 	className="listing-thumbnail"
									 		 	alt="property"
									 		 	loading="lazy"
									 		 	onLoad={() => handleImageLoad(item.property_id)}
									 		 	onError={() => handleImageError(item.property_id)}
									 		 	onClick={() => {
									 		 		setPropertyInfo(item);
									 		 		setActivePropertyInfo(true);
									 		 	}}
									 		 />
									 		 <a 
							 					href={item.listing_url}
							 					className="airbnb-link"
							 					target="_blank"
							 					rel="noopener noreferrer"
							 				>
							 					View on Airbnb
							 				</a>
									 		 <img
						 		 				className="airbnb-cancel-cross"
						 		 				src="static/logos/cancel_search.svg" 
						 		 				alt="cancel-icon"
						 		 				onClick={(e: any) => rejectId(e, item)}
						 		 			/>
									 	</div>
									    <div className="listing-content">
									    	<div className="title-wrapper">
									    		<div className="listing-title">{item.name}</div>
										    	<div className="listing-rating">
										            ★ {item.review_scores_rating} ({item.number_of_reviews})
										        </div>
										    </div>
									        <div className="listing-info">{item.accommodates} guests | {item.property_type}</div>
									        <div 
									        	className="listing-price" 
									        	style={{
									        		color: 
														item['price'] < bottomLimit ? 
														"rgba(255, 0, 0, 1)" :
														item['price'] > topLimit ? 
														"rgba(166, 166, 244, 1)" :
														"rgba(67, 181, 64, 1)"
									        	}}
									        >
									        	{item.price} € night
									        </div>
									    </div>
									</div>
								</div>
					)}
				)}
			</div>
		</div>
	)
}

Right.displayName="Right";