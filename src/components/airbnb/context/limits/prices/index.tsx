// React imports
import { useContext, createContext } from 'react';

// Context imports
import { usePricesApi } from '../../api/imoveis/prices';
import { usePrices } from '../../filters/prices';
import { useDates } from '../../filters/dates';
 
const PricesLimitsContext: React.Context<any> = createContext(null)

export const usePricesLimits = () => {
	return (
		useContext(PricesLimitsContext)
	)
}

export const PricesLimitsProvider = ({children}: any) => {
	const { pricesData } = usePricesApi();
	const { leftPosition, rightPosition } = usePrices();
	const { formatedStartDate, formatedFinalDate } = useDates();

    const filterPrices = pricesData && pricesData.filter((d: any) => {
        return (leftPosition < d['price'] && d['price'] < rightPosition)
    });

    const filterPoints = filterPrices && filterPrices.filter((d: any) => {  		
    	return formatedStartDate < new Date(d.start_date) && new Date(d.start_date) < formatedFinalDate
    });

	return (
		<PricesLimitsContext.Provider value={{ filterPoints }}>
			{children}
		</PricesLimitsContext.Provider>
	)
}

PricesLimitsContext.displayName = "PricesLimitsContext";