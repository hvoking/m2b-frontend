// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { usePolygonApi } from '../../polygon';
import { usePropertyType } from '../../../filters/property';
import { useEquipment } from '../../../filters/equipment';
import { useDates } from '../../../filters/dates';

const PricesApiContext: React.Context<any> = createContext(null)

export const usePricesApi = () => {
	return (
		useContext(PricesApiContext)
	)
}

export const PricesApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const { businessTypeId, propertyTypeId, nearest, orderBy } = usePropertyType();
	const { rooms, suites, garages } = useEquipment();
	const { dates } = useDates();

	const [ pricesData, setPricesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
		  	const tempUrl = `
		    	${process.env.REACT_APP_API_URL}/
		    	prices_api
				?business_type_id=${businessTypeId}
		    	&property_type_id=${propertyTypeId}
		    	&rooms=${rooms}
		    	&suites=${suites}
		    	&garages=${garages}
		    	&k=${nearest}
		    	&start_date=${datesFormat(dates[0])}
	    		&final_date=${datesFormat(dates[1])}
	    		&order_by=${orderBy}
		    `
		    const url = tempUrl.replace(/\s/g, '');
		    const res = await fetch(url);
		  	const receivedData = await res.json();
		  	setPricesData(receivedData[0]);
		}
		polygonData && fetchData();
	}, [
		polygonData,
		businessTypeId, propertyTypeId, 
		rooms, suites, garages,
		nearest, orderBy
	]);

	return (
		<PricesApiContext.Provider value={{ pricesData }}>
			{children}
		</PricesApiContext.Provider>
	)
}

PricesApiContext.displayName = "PricesApiContext";