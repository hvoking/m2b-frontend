// React imports
import { useState, useEffect } from 'react';

// App imports
import { Header } from './header';
import { Body } from './body';
import './styles.scss';

// Context imports
import { usePropertyType } from '../../context/filters/property';
import { usePrices } from '../../context/filters/prices';
import { useDates } from '../../context/filters/dates';
import { useTooltip } from '../../context/maps/tooltip';
import { useLinesLimits } from '../../context/limits/lines';

export const Pictures = ({ linesData, pricesData }: any) => {
	const [ validImages, setValidImages ] = useState<any>({});

	const { rejectedIds, setRejectedIds, currentPropertyId, nearest, setNearest, activeEquipment, setCurrentPropertyId, setSamplesIds } = usePropertyType();
	const { setSamplesPrices, leftPosition, rightPosition } = usePrices();
	const { startDate, finalDate } = useDates();
	const { setPropertyInfo, setActivePropertyInfo } = useTooltip();
	const { bottomLimit, topLimit } = useLinesLimits();

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const filterByPrices = pricesData.filter((d: any) => {
		return (leftPosition < d['price'] && d['price'] < rightPosition)
	});

  	const filterPoints = filterByPrices && filterByPrices.filter((d: any) => {  		
  		return currentStartDate < new Date(d.start_date) && new Date(d.start_date) < currentFinalDate
  	});

	const filterById = filterPoints.filter((item: any) => !rejectedIds.includes(item.property_id))

	useEffect(() => {
		setSamplesPrices(filterById.slice(0, nearest).map((item: any) => item['price']));
		setSamplesIds(filterById.slice(0, nearest).map((item: any) => item['property_id']))
	}, [ 
		rejectedIds, activeEquipment, linesData, 
		leftPosition, rightPosition, 
		startDate, finalDate,
	]);

	const handleImageLoad = (id: any) => {
	    setValidImages((prev: any) => ({ ...prev, [id]: true }));
	  };

	  const handleImageError = (id: any) => {
	    setValidImages((prev: any) => ({ ...prev, [id]: false }));
	  };


	return (
		
				<div className="right-item-wrapper">
					<Header nearest={nearest} setNearest={setNearest}/>
					<div className="airbnb-images-wrapper">
						<div className="right-pictures">
							{filterById.slice(0, nearest).map((item: any, index: any) => {
								const currentImage = item.image_src && item.image_src;
								return (
									<>
										{validImages[item.property_id] !== false && (
											<div
												key={index} 
												className="airbnb-pictures-box"
												style={{ 
													border: 
														currentPropertyId && currentPropertyId === item.property_id ? 
														"2px solid rgba(255, 255, 0, 1)" :
														"2px solid rgba(23, 23, 32, 1)",
													backgroundColor: 
														item['price'] < bottomLimit ? 
														"rgba(68, 27, 30, 1)" :
														item['price'] > topLimit ? 
														"rgba(42, 43, 96, 1)" :
														"rgba(21, 59, 39, 1)"
												}}
											>
												<div style={{
													backgroundColor: 
														item['price'] < bottomLimit ? 
														"rgba(255, 0, 0, 1)" :
														item['price'] > topLimit ? 
														"rgba(166, 166, 244, 1)" :
														"rgba(67, 181, 64, 1)"
												}}></div>
												<div
													className="right-pictures-item"
													onClick={() => {
														setPropertyInfo(item);
														setActivePropertyInfo(true);
													}}
												>
													<img 
														className="pdf-pictures-img"
														src={currentImage}
														alt="property"
														width="120"
														height="80"
														loading="lazy"
														onLoad={() => handleImageLoad(item.property_id)}
														onError={() => handleImageError(item.property_id)}
													/>
													<Body 
														item={item} 
														setRejectedIds={setRejectedIds} 
														setCurrentPropertyId={setCurrentPropertyId}
													/>
												</div>
											</div>
										)}
									</>
								)}
							)}
						</div>
					</div>
				</div>
	)
}

Pictures.displayName="Pictures";