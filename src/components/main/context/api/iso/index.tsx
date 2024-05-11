// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';
import { useIsoPolygonApi } from '../isoPolygon';

const IsoApiContext: React.Context<any> = createContext(null)

export const useIsoApi = () => {
	return (
		useContext(IsoApiContext)
	)
}

export const IsoApiProvider = ({children}: any) => {
	const { placeCoordinates } = useGeo();
	const { isoPolygonData } = useIsoPolygonApi();

	const [ isoData, setIsoData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/iso_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"iso_polygon": JSON.stringify(isoPolygonData.features[0].geometry),
					"longitude": JSON.stringify(placeCoordinates.longitude),
					"latitude": JSON.stringify(placeCoordinates.latitude),
				}),
			});
			const receivedData = await res.json();
			setIsoData(receivedData[0]);
		}
		isoPolygonData && fetchData();
	}, [ isoPolygonData ]);

	return (
		<IsoApiContext.Provider value={{ isoData }}>
			{children}
		</IsoApiContext.Provider>
	)
}

IsoApiContext.displayName = "IsoApiContext";