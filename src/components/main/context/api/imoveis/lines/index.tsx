// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { usePolygonApi } from '../../polygon';
import { usePropertyType } from '../../../filters/property';
import { useEquipment } from '../../../filters/equipment';
import { useDates } from '../../../filters/dates';

const LinesApiContext: React.Context<any> = createContext(null)

export const useLinesApi = () => {
	return (
		useContext(LinesApiContext)
	)
}

export const LinesApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const { businessTypeId, propertyTypeId } = usePropertyType();
	const { rooms, suites, garages } = useEquipment();
	const { dates } = useDates();

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
		    `
		    const url = tempUrl.replace(/\s/g, '');
		    const res = await fetch(url);
		    const receivedData = await res.json();
			setLinesData(receivedData);
		}
		polygonData && fetchData();
	}, [
		polygonData,
		businessTypeId, propertyTypeId, 
		rooms, suites, garages,
		dates
	]);

	return (
		<LinesApiContext.Provider value={{ linesData }}>
			{children}
		</LinesApiContext.Provider>
	)
}

LinesApiContext.displayName = "LinesApiContext";