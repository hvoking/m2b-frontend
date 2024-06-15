// React imports
import { useContext, createContext } from 'react';

// Context imports
import { usePricesApi } from '../../api/imoveis/prices';
import { useHexagonsApi } from '../../api/hexagons';
import { usePrices } from '../../filters/prices';
 
const PricesLimitsContext: React.Context<any> = createContext(null)

export const usePricesLimits = () => {
	return (
		useContext(PricesLimitsContext)
	)
}

export const PricesLimitsProvider = ({children}: any) => {
	const { pricesData } = usePricesApi();
	const { hexagonsData } = useHexagonsApi();
	const { leftPosition, rightPosition } = usePrices();

    const filterPrices = pricesData && pricesData.filter((d: any) => {
        return (leftPosition < d['price'] && d['price'] < rightPosition)
    });

    const filterHexagons = hexagonsData && hexagonsData.filter((d: any) => {
        return (leftPosition < d['avg_price'] && d['avg_price'] < rightPosition)
    });


	return (
		<PricesLimitsContext.Provider value={{ filterPrices, filterHexagons }}>
			{children}
		</PricesLimitsContext.Provider>
	)
}

PricesLimitsContext.displayName = "PricesLimitsContext";