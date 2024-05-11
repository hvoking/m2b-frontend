// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoApi } from '../../iso';
import { usePropertyType } from '../../../filters/property';

const DsvApiContext: React.Context<any> = createContext(null)

export const useDsvApi = () => {
	return (
		useContext(DsvApiContext)
	)
}

export const DsvApiProvider = ({children}: any) => {
	const { isoData } = useIsoApi();
	const { businessTypeId, propertyTypeId } = usePropertyType();
	
	const [ dsvData, setDsvData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	dsv_api
			?business_type_id=${businessTypeId}
			&property_type_id=${propertyTypeId}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setDsvData(receivedData);
	  }
	  isoData && fetchData();
	}, [ isoData, businessTypeId, propertyTypeId ]);

	return (
		<DsvApiContext.Provider value={{ dsvData }}>
			{children}
		</DsvApiContext.Provider>
	)
}

DsvApiContext.displayName = "DsvApiContext";