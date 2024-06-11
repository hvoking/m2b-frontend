// React imports
import { useContext, createContext } from 'react';

// Context imports
import { usePointsApi } from '../../api/imoveis/points';
import { usePrices } from '../../filters/prices';
import { useDates } from '../../filters/dates';
 
const PointsLimitsContext: React.Context<any> = createContext(null)

export const usePointsLimits = () => {
	return (
		useContext(PointsLimitsContext)
	)
}

export const PointsLimitsProvider = ({children}: any) => {
	const { pointsData } = usePointsApi();
	const { leftPosition, rightPosition } = usePrices();
	const { startDate, finalDate } = useDates();

  	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const filterPoints = pointsData?.filter((d: any) =>
        leftPosition < d['price'] &&
        d['price'] < rightPosition &&
        currentStartDate < new Date(d.start_date) &&
        new Date(d.start_date) < currentFinalDate
    );

	return (
		<PointsLimitsContext.Provider value={{filterPoints}}>
			{children}
		</PointsLimitsContext.Provider>
	)
}

PointsLimitsContext.displayName = "PointsLimitsContext";