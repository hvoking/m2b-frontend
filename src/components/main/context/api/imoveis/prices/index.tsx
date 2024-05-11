// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { useIsoApi } from '../../iso';
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
	const { isoData } = useIsoApi();
	const { businessTypeId, propertyTypeId, nearest } = usePropertyType();
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
		    	&start_date=${datesFormat(dates[0])}
		    	&final_date=${datesFormat(dates[1])}
		    	&k=${nearest}
		    `
		    const url = tempUrl.replace(/\s/g, '');
		    const res = await fetch(url);
		  	const receivedData = await res.json();
		  	setPricesData(receivedData[0]);
		}
		isoData && fetchData();
	}, [
		isoData,
		businessTypeId, propertyTypeId, 
		rooms, suites, garages,
		nearest, 
		dates
	]);

	return (
		<PricesApiContext.Provider value={{ pricesData }}>
			{children}
		</PricesApiContext.Provider>
	)
}

PricesApiContext.displayName = "PricesApiContext";