// React imports
import { useContext, createContext } from 'react';

// Context imports
import { usePointsApi } from '../../api/imoveis/points';
import { useAreas } from '../../filters/areas';
import { usePrices } from '../../filters/prices';
import { useDates } from '../../filters/dates';
import { usePropertyType } from '../../filters/property';
 
const PointsLimitsContext: React.Context<any> = createContext(null)

export const usePointsLimits = () => {
	return (
		useContext(PointsLimitsContext)
	)
}

export const PointsLimitsProvider = ({children}: any) => {
	const { pointsData } = usePointsApi();
	const { areaMin, areaMax } = useAreas();
	const { unitPrice, leftPosition, rightPosition } = usePrices();
	const { startDate, finalDate } = useDates();
	const { activeEquipment } = usePropertyType();

	const currentPriceString = 
  		unitPrice === "price" ? 
  		"price" : 
  		"unit_price";

  	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const filteredByAreas = pointsData?.filter((d: any) =>
        areaMin < d.processed_area &&
        d.processed_area < areaMax &&
        leftPosition < d[currentPriceString] &&
        d[currentPriceString] < rightPosition &&
        currentStartDate < new Date(d.start_date) &&
        new Date(d.start_date) < currentFinalDate
    );

  	const activePoints = filteredByAreas?.filter((item: any) => {
        return item[activeEquipment] === 1;
    });

  	const filterPoints = 
  		activeEquipment === "furnished" || 
  		activeEquipment === "pool" || 
  		activeEquipment === "new" || 
  		activeEquipment === "status"?
  	    activePoints :
  	    filteredByAreas

	return (
		<PointsLimitsContext.Provider value={{filterPoints}}>
			{children}
		</PointsLimitsContext.Provider>
	)
}

PointsLimitsContext.displayName = "PointsLimitsContext";