// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../isoPolygon';

const HexagonsApiContext: React.Context<any> = createContext(null)

export const useHexagonsApi = () => {
	return (
		useContext(HexagonsApiContext)
	)
}

export const HexagonsApiProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();

	const [ hexagonsData, setHexagonsData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/hexagons_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
			});
			const receivedData = await res.json();
			setHexagonsData(receivedData[0]);
		}
		isoPolygonData && fetchData();
	}, [ isoPolygonData ]);

	return (
		<HexagonsApiContext.Provider value={{ hexagonsData }}>
			{children}
		</HexagonsApiContext.Provider>
	)
}

HexagonsApiContext.displayName = "HexagonsApiContext";