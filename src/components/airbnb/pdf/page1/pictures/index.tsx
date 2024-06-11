// React imports
import { useEffect } from 'react';

// App imports
import { Description } from './description';
import './styles.scss';

// Context imports
import { usePropertyType } from '../../../context/filters/property';
import { usePrices } from '../../../context/filters/prices';
import { useDates } from '../../../context/filters/dates';
import { useTooltip } from '../../../context/maps/tooltip';
import { useLinesLimits } from '../../../context/limits/lines';

export const PdfPictures = ({ linesData, pricesData }: any) => {
	const { rejectedIds, setRejectedIds, currentPropertyId, setCurrentPropertyId, nearest, activeEquipment } = usePropertyType();
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
		setSamplesPrices(filterById.slice(0, nearest).map((item: any) => item['price']))
	}, [ 
		rejectedIds, activeEquipment, linesData, 
		leftPosition, rightPosition, 
		startDate, finalDate, 
	]);

	return (
		<div className="pdf-images-wrapper">
			<div className="pdf-pictures">
				{filterById.slice(0, nearest).map((item: any, index: any) => {
					const currentImage = item.image_src && item.image_src;
					return (
						<div
							key={index} 
							className="pdf-pictures-box"
							style={{
								border: 
									currentPropertyId && currentPropertyId === item.property_id ? 
									"1px solid rgba(255, 255, 0, 1)" :
									"1px solid rgba(0, 0, 0, 1)",
							}}
						>
						<div style={{
							backgroundColor: 
								item['price'] < bottomLimit ? 
								"rgba(255, 0, 0, 1)" :
								item['price'] > topLimit ? 
								"rgba(166, 166, 244, 1)" :
								"rgba(67, 181, 64, 1)"
						}}/>
						<div
							className="pdf-pictures-item"
							onClick={() => {
								setPropertyInfo(item);
								setActivePropertyInfo(true);
							}}
						>
							<img 
								className="pdf-pictures-img"
								src={currentImage}
								alt="property"
								width="55"
								height="45"
								loading="lazy"
							/>
							<Description 
								item={item} 
								setRejectedIds={setRejectedIds}
								setCurrentPropertyId={setCurrentPropertyId}
							/>
						</div>
					</div>
					)}
				)}
			</div>
		</div>
	)
}

PdfPictures.displayName="PdfPictures";