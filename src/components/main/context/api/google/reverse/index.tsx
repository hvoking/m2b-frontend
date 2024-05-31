// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const ReverseGeocodingApiContext: React.Context<any> = createContext(null)

export const useReverseGeocodingApi = () => {
	return (
		useContext(ReverseGeocodingApiContext)
	)
}

export const ReverseGeocodingApiProvider = ({children}: any) => {
	const [ parcelsProperties, setParcelsProperties ] = useState<any>({});
	const [ parcelLongitude, setParcelLongitude ] = useState<any>(null);
	const [ parcelLatitude, setParcelLatitude ] = useState<any>(null);
	const [ currentAddress, setCurrentAddress ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	reverse_api
	    	?lat=${parcelLatitude}
	    	&lng=${parcelLongitude}
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    const receivedAddress = receivedData.formatted_address;
	    const address = receivedAddress.split(",").slice(0, 3).join(",") + "," + receivedAddress.split(",").slice(-1)

	    setCurrentAddress(address);
	  }
	  parcelLongitude && fetchData();
	}, [ parcelLongitude ]);

	return (
		<ReverseGeocodingApiContext.Provider value={{ 
			parcelsProperties, setParcelsProperties,
			setParcelLatitude, setParcelLongitude,
			currentAddress
		}}>
			{children}
		</ReverseGeocodingApiContext.Provider>
	)
}

ReverseGeocodingApiContext.displayName = "ReverseGeocodingApiContext";