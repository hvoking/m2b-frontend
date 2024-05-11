// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoApi } from '../../iso';
import { usePropertyType } from '../../../filters/property';
import { useCategory } from '../../../filters/category';

const HistApiContext: React.Context<any> = createContext(null)

export const useHistApi = () => {
	return (
		useContext(HistApiContext)
	)
}

export const HistApiProvider = ({children}: any) => {
	const { isoData } = useIsoApi();
	const { businessTypeId, propertyTypeId } = usePropertyType();
	const { categoryId } = useCategory();
	
	const [ histData, setHistData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	hist_api
			?business_type_id=${businessTypeId}
			&property_type_id=${propertyTypeId}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setHistData(receivedData);
	  }
	  isoData && categoryId === 2 && fetchData();
	}, [ isoData, categoryId, businessTypeId, propertyTypeId ]);

	return (
		<HistApiContext.Provider value={{ histData }}>
			{children}
		</HistApiContext.Provider>
	)
}

HistApiContext.displayName = "HistApiContext";