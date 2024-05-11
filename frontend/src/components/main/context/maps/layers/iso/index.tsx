// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useIsoPolygonApi } from '../../../api/isoPolygon';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GeoJsonLayer } from 'deck.gl';

const IsoLayerContext: React.Context<any> = createContext(null);

export const useIsoLayer = () => {
	return (
		useContext(IsoLayerContext)
	)
}

export const IsoLayerProvider = ({children}: any) => {
	const { isoPolygonData } = useIsoPolygonApi();

	const isoLayer = isoPolygonData &&
		new GeoJsonLayer({
			id: 'iso-polygon-geojson',
			pickable: true,
			data: isoPolygonData.features[0].geometry,
			getFillColor: [222, 112, 112, 120],
			getLineColor: [126, 126, 132, 255],
			getLineWidth: 10,
			parameters: { depthTest: false },
		});

	return (
		<IsoLayerContext.Provider value={{ isoLayer }}>
			{children}
		</IsoLayerContext.Provider>
	)
}

IsoLayerContext.displayName = "IsoLayerContext";