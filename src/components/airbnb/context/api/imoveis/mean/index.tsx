// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../isoPolygon';
import { useEquipment } from '../../../filters/equipment';

const MeanApiContext: React.Context<any> = createContext(null)

export const useMeanApi = () => {
	return (
		useContext(MeanApiContext)
	)
}

export const MeanApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();
	const { rooms } = useEquipment();
	
	const [ meanData, setMeanData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	airbnb_mean_api
	    	?rooms=${rooms}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setMeanData(receivedData[0]);
	  }
	  // isoPolygonData && fetchData();
	}, [ isoPolygonData, rooms ]);

	return (
		<MeanApiContext.Provider value={{ meanData }}>
			{children}
		</MeanApiContext.Provider>
	)
}

MeanApiContext.displayName = "MeanApiContext";