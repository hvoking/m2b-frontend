// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';
import { usePropertyType } from '../../../filters/property';
import { useEquipment } from '../../../filters/equipment';
import { useAreas } from '../../../filters/areas';
import { useDates } from '../../../filters/dates';

const MeanApiContext: React.Context<any> = createContext(null)

export const useMeanApi = () => {
	return (
		useContext(MeanApiContext)
	)
}

export const MeanApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const { businessTypeId, propertyTypeId } = usePropertyType();
	const { rooms, suites, garages } = useEquipment();
	const { areaMin, areaMax} = useAreas();
	const { dates } = useDates();
	
	const [ meanData, setMeanData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	mean_api
			?business_type_id=${businessTypeId}
	    	&property_type_id=${propertyTypeId}
	    	&rooms=${rooms}
	    	&suites=${suites}
	    	&garages=${garages}
	    	&area_min=${areaMin}
	    	&area_max=${areaMax}
	    	&start_date=${datesFormat(dates[0])}
		    &final_date=${datesFormat(dates[1])}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setMeanData(receivedData[0]);
	  }
	  isoPolygonData && fetchData();
	}, [ 
		isoPolygonData,
		businessTypeId, propertyTypeId, 
		rooms, suites, garages,
		areaMax, areaMin
	]);

	return (
		<MeanApiContext.Provider value={{ meanData }}>
			{children}
		</MeanApiContext.Provider>
	)
}

MeanApiContext.displayName = "MeanApiContext";