// React imports
import { useEffect } from 'react';

// App imports
import { Description } from './description';

// Context imports
import { usePropertyType } from '../../../context/filters/property';
import { usePrices } from '../../../context/filters/prices';
import { useAreas } from '../../../context/filters/areas';
import { useDates } from '../../../context/filters/dates';
import { useTooltip } from '../../../context/maps/tooltip';
import { useLinesLimits } from '../../../context/limits/lines';

export const PdfPictures = ({ linesData, pricesData }: any) => {
	const { rejectedIds, setRejectedIds, currentPropertyId, setCurrentPropertyId, nearest, activeEquipment } = usePropertyType();
	const { setSamplesPrices, leftPosition, rightPosition, unitPrice } = usePrices();
	const { areaMin, areaMax } = useAreas();
	const { startDate, finalDate } = useDates();
	const { setPropertyInfo, setActivePropertyInfo } = useTooltip();
	const { bottomLimit, topLimit } = useLinesLimits();

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const currentPriceString = 
  		unitPrice === "price" ? 
  		"price" : 
  		"unit_price";

  	const filteredByAreas = pricesData.filter((d: any) => {
  		return (areaMin < d.processed_area && d.processed_area < areaMax)
  	});

	const filterByPrices = filteredByAreas.filter((d: any) => {
		return (leftPosition < d[currentPriceString] && d[currentPriceString] < rightPosition)
	});

  	const filterByDates = filterByPrices && filterByPrices.filter((d: any) => {  		
  		return currentStartDate < new Date(d.start_date) && new Date(d.start_date) < currentFinalDate
  	});

	const activePoints = filterByDates.filter((item: any) => {
	    if (item.furnished === 1 && activeEquipment === "furnished") {
	        return item
	    }
	    else if (item.pool === 1 && activeEquipment === "pool") {
	        return item
	    }
	    else if (item.new === 1 && activeEquipment === "new") {
	        return item
	    }
	    else if (item.status === 1 && activeEquipment === "status") {
	        return item
	    }
	});

	const filterPoints = 
	    activeEquipment === "furnished" || 
	    activeEquipment === "pool" || 
	    activeEquipment === "new" || 
	    activeEquipment === "status" ?
	    activePoints :
	    filterByDates
	
	const filterById = filterPoints.filter((item: any) => !rejectedIds.includes(item.property_id))

	useEffect(() => {
		setSamplesPrices(filterById.slice(0, nearest).map((item: any) => item[currentPriceString]))
	}, [ 
		rejectedIds, activeEquipment, linesData, unitPrice, 
		leftPosition, rightPosition, 
		startDate, finalDate, 
		areaMin, areaMax 
	]);

	const iscUrl = "https://media.imoveis-sc.com.br/media/thumb-290-250/";

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
								item[currentPriceString] < bottomLimit ? 
								"rgba(255, 0, 0, 1)" :
								item[currentPriceString] > topLimit ? 
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
								src={iscUrl + currentImage}
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