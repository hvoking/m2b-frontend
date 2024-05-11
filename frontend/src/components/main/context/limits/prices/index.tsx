// React imports
import { useContext, createContext } from 'react';

// Context imports
import { usePricesApi } from '../../api/imoveis/prices';
import { useAreas } from '../../filters/areas';
import { usePrices } from '../../filters/prices';
import { usePropertyType } from '../../filters/property';
 
const PricesLimitsContext: React.Context<any> = createContext(null)

export const usePricesLimits = () => {
	return (
		useContext(PricesLimitsContext)
	)
}

export const PricesLimitsProvider = ({children}: any) => {
	const { pricesData } = usePricesApi();
	const { areaMin, areaMax } = useAreas();
	const { unitPrice, leftPosition, rightPosition } = usePrices();
	const { activeEquipment } = usePropertyType();

	const currentPriceString = 
  		unitPrice === "price" ? 
  		"price" : 
  		"unit_price";

	const filterByAreas = pricesData && pricesData.filter((d: any) => {
        return (areaMin < d.processed_area && d.processed_area < areaMax)
    })

    const filterByPrices = pricesData && filterByAreas.filter((d: any) => {
        return (leftPosition < d[currentPriceString] && d[currentPriceString] < rightPosition)
    })

    const activePoints = pricesData && filterByPrices.filter((item: any) => {
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

    const filterPrices = 
        activeEquipment === "furnished" || 
        activeEquipment === "pool" || 
        activeEquipment === "new" || 
        activeEquipment === "status" ?
        activePoints :
        filterByPrices

	return (
		<PricesLimitsContext.Provider value={{filterPrices}}>
			{children}
		</PricesLimitsContext.Provider>
	)
}

PricesLimitsContext.displayName = "PricesLimitsContext";