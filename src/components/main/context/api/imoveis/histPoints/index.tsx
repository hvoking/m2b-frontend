// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoApi } from '../../iso';
import { usePropertyType } from '../../../filters/property';
import { useEquipment } from '../../../filters/equipment';
import { useGeo } from '../../../filters/geo';
import { useCategory } from '../../../filters/category';

const HistPointsApiContext: React.Context<any> = createContext(null)

export const useHistPointsApi = () => {
	return (
		useContext(HistPointsApiContext)
	)
}

export const HistPointsApiProvider = ({children}: any) => {
	const { isoData } = useIsoApi();
	const { propertyTypeId, businessTypeId } = usePropertyType();
	const { rooms, suites, garages } = useEquipment();
	const { cityId } = useGeo();
	const { categoryId } = useCategory();
	
	const [ histPointsData, setHistPointsData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	hist_points_api/
	    	${cityId}
			?business_type_id=${businessTypeId}
	    	&property_type_id=${propertyTypeId}
	    	&rooms=${rooms}
	    	&suites=${suites}
	    	&garages=${garages}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setHistPointsData(receivedData[0]);
	  }
	  isoData && categoryId === 2 && fetchData();
	}, [ 
		isoData,
		categoryId, cityId,
		businessTypeId, propertyTypeId, 
		rooms, suites, garages
	]);

	return (
		<HistPointsApiContext.Provider value={{ histPointsData }}>
			{children}
		</HistPointsApiContext.Provider>
	)
}

HistPointsApiContext.displayName = "HistPointsApiContext";