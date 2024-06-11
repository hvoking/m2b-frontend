// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { usePolygonApi } from '../../polygon';
import { useDates } from '../../../filters/dates';
import { useEquipment } from '../../../filters/equipment';

const PointsApiContext: React.Context<any> = createContext(null)

export const usePointsApi = () => {
	return (
		useContext(PointsApiContext)
	)
}

export const PointsApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const { rooms } = useEquipment();
	const { dates } = useDates();
	
	const [ pointsData, setPointsData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	airbnb_points_api
	    	?rooms=${rooms}
	    	&start_date=${datesFormat(dates[0])}
	    	&final_date=${datesFormat(dates[1])}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setPointsData(receivedData[0]);
	  }
	  polygonData && fetchData();
	}, [ polygonData, rooms, dates ]);

	return (
		<PointsApiContext.Provider value={{ pointsData }}>
			{children}
		</PointsApiContext.Provider>
	)
}

PointsApiContext.displayName = "PointsApiContext";