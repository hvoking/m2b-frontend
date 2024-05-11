// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { useIsoApi } from '../../iso';
import { usePropertyType } from '../../../filters/property';
import { useEquipment } from '../../../filters/equipment';
import { useDates } from '../../../filters/dates';
import { usePrices } from '../../../filters/prices';

const LinesApiContext: React.Context<any> = createContext(null)

export const useLinesApi = () => {
	return (
		useContext(LinesApiContext)
	)
}

export const LinesApiProvider = ({children}: any) => {
	const { isoData } = useIsoApi();
	const { businessTypeId, propertyTypeId, nearest } = usePropertyType();
	const { rooms, suites, garages } = useEquipment();
	const { dates } = useDates();
	const { unitPrice } = usePrices();

	const [ linesData, setLinesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
		  	const tempUrl = `
		    	${process.env.REACT_APP_API_URL}/
		    	lines_api
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
			setLinesData(receivedData[0]);
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
		<LinesApiContext.Provider value={{ linesData }}>
			{children}
		</LinesApiContext.Provider>
	)
}

LinesApiContext.displayName = "LinesApiContext";