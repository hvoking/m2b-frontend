// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null)

export const useGeo = () => {
	return (
		useContext(GeoContext)
	)
}

export const GeoProvider = ({children}: any) => {
	const [ cityId, setCityId ] = useState<any>(37);
	const [ placeId, setPlaceId ] = useState<any>(null);
	
	const [ viewport, setViewport ] = useState(Locations.london);
	const [ placeCoordinates, setPlaceCoordinates ] = useState({
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});

	const [ geocodingLongitude, setGeocodingLongitude ] = useState(viewport.longitude);
	const [ geocodingLatitude, setGeocodingLatitude ] = useState(viewport.latitude);

	const [ marker, setMarker ] = useState({ 
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});

	useEffect(() => {
		setViewport({...viewport, ...placeCoordinates});
		placeCoordinates && setGeocodingLatitude(placeCoordinates.latitude) 
		placeCoordinates && setGeocodingLongitude(placeCoordinates.longitude)
	}, [ placeCoordinates ])

	return (
		<GeoContext.Provider value={{
			cityId, setCityId, 
			placeId, setPlaceId, 
			marker, setMarker,
			placeCoordinates, setPlaceCoordinates,
			viewport, setViewport,
			geocodingLongitude, setGeocodingLongitude,
			geocodingLatitude, setGeocodingLatitude,
			Locations,
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";