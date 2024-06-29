// React imports
import { useState } from 'react';

// App imports
import { Header } from './header';
import './styles.scss';

// Context imports
import { usePropertyType } from '../../../context/filters/property';
import { usePrices } from '../../../context/filters/prices';
import { useAreas } from '../../../context/filters/areas';
import { useDates } from '../../../context/filters/dates';
import { useTooltip } from '../../../context/maps/tooltip';
import { useLinesLimits } from '../../../context/limits/lines';

// Third-party imports
import * as d3 from 'd3';

export const Table = ({ linesData, pricesData }: any) => {
	const [ sortKey, setSortKey ] = useState("distance");
	const [ currentDirection, setCurrentDirection ] = useState("up");

	const { rejectedIds, setRejectedIds, setCurrentPropertyId, nearest, activeEquipment } = usePropertyType();
	const { leftPosition, rightPosition, unitPrice } = usePrices();
	const { areaMin, areaMax } = useAreas();
	const { startDate, finalDate } = useDates();
	const { setPropertyInfo, setActivePropertyInfo } = useTooltip();
	const { bottomLimit, topLimit } = useLinesLimits();

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const siFormat = d3.format(",");

	const currentPriceString = unitPrice === "price" ? "price" : "unit_price";

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
	
	const filterById = filterPoints.filter((item: any) => !rejectedIds.includes(item.property_id));
	
	currentDirection === "up" ?
	filterById.sort((a: any, b: any) => b[sortKey] - a[sortKey]) :
	filterById.sort((a: any, b: any) => a[sortKey] - b[sortKey]);

	const iscUrl = "https://media.imoveis-sc.com.br/media/thumb-290-250/";

	const onClick = (e: any, item: any) => {
		setCurrentPropertyId(item.property_id);
		setPropertyInfo(item);
		setActivePropertyInfo(true)
	}

	// const rejectId = (e: any, item: any) => {
	// 	e.stopPropagation();
	// 	const currentValue = item.property_id;
	// 	setRejectedIds((prev: any) => [...prev, currentValue]);
	// }

	// onClick={(e: any) => rejectId(e, item)}

	return (
		<div className="fixTableHead"> 
			<table>
				<Header setSortKey={setSortKey} setCurrentDirection={setCurrentDirection}/>
				<tbody> 
					{filterById.slice(0, nearest).map((item: any, index: any) => {
						const currentImage = iscUrl + item.image_src;
						const distance = (Math.round(item.distance * 10000 * 10) / 10).toString().replace(".", ",");
						const currentPrice = siFormat(Math.round(item.price)).replace(",", ".");
						const currentUnitPrice = siFormat(Math.round(item.unit_price)).replace(",", ".");

						return (
							<tr key={index} onClick={(e: any) => onClick(e, item)}>
								<td>
									<div 
										style={{
											backgroundColor: 
												item[currentPriceString] < bottomLimit ? 
												"rgba(255, 0, 0, 1)" :
												item[currentPriceString] > topLimit ? 
												"rgba(166, 166, 244, 1)" :
												"rgba(67, 181, 64, 1)"
										}}
									>
										{index + 1}
									</div>
								</td>
								<td>
									<img 
										src={currentImage}
										alt="property"
										width="55"
										height="45"
										loading="lazy"
									/>
								</td>
								<td>{distance} m</td>
								<td>{item.processed_area} m²</td>
								<td>R$ {currentPrice}</td>
								<td>R$ {currentUnitPrice}</td>
							</tr>
						)}
					)}
				</tbody> 
			</table>
		</div>
	)
}

Table.displayName="Table";