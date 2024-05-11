// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useHistPointsApi } from '../../../api/imoveis/histPoints';
import { useCategory } from '../../../filters/category';

// Third-party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { HeatmapLayer } from 'deck.gl';

const HeatMapLayerContext: React.Context<any> = createContext(null)

export const useHeatmapLayer = () => {
	return (
		useContext(HeatMapLayerContext)
	)
}

export const HeatmapLayerProvider = ({children}: any) => {
	const { histPointsData } = useHistPointsApi();
	const { categoryId } = useCategory();

	const heatmapLayer = categoryId === 2 && histPointsData && 
		new HeatmapLayer({
		    id: 'heat-map-layer',
		    data: histPointsData,
		    getPosition: (d: any) => [d.longitude, d.latitude],
		    getWeight: (d: any) => d.visits,
		    aggregation: 'SUM',
		  });
	return (
		<HeatMapLayerContext.Provider value={{ heatmapLayer }}>
			{children}
		</HeatMapLayerContext.Provider>
	)

}

HeatMapLayerContext.displayName = "HeatMapLayerContext";