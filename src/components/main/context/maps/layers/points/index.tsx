// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useTooltip } from '../../../maps/tooltip';
import { usePrices } from '../../../filters/prices';
import { usePropertyType } from '../../../filters/property';
import { useCategory } from '../../../filters/category';
import { useLinesLimits } from '../../../limits/lines';
import { usePointsLimits } from '../../../limits/points';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { GridCellLayer } from 'deck.gl';

const PointsLayerContext: React.Context<any> = createContext(null)

export const usePointsLayer = () => {
	return (
		useContext(PointsLayerContext)
	)
}

export const PointsLayerProvider = ({children}: any) => {
	const { unitPrice } = usePrices();
	const { bottomLimit, topLimit } = useLinesLimits();
	const { categoryId } = useCategory();
	const { setPropertyHoverInfo, setPropertyInfo, setActivePropertyInfo } = useTooltip();
	const { businessTypeId, currentPropertyId, setCurrentPropertyId } = usePropertyType();
	const { filterPoints } = usePointsLimits();

	const currentPriceString = 
  		unitPrice === "price" ? 
  		"price" : 
  		"unit_price";

  	const onClick = (info: any) => {
  		setActivePropertyInfo(true);
  		info.object && setPropertyInfo(info.object);
  	};

  	const onHover = (info: any) => {
  		info.object && setCurrentPropertyId(info.object.property_id);
  		!info.object && setCurrentPropertyId(null);
  		setPropertyHoverInfo(info);
  	}

	const pointsLayer = categoryId === 1 && filterPoints &&
		new GridCellLayer({
		    id: 'prices-layer',
		    data: filterPoints,
		    cellSize: 10,
		    pickable: true,
		    getPosition: (d: any) => [d.longitude, d.latitude],
		    material: false,
			getElevation: (d: any) => 
				unitPrice === "price" ? 
				d.price / 400 : 
				d.unit_price / 4,
		    elevationScale: businessTypeId === 1 ? 0.05 : 10,
		    getFillColor: (d: any) => 
		    	currentPropertyId && currentPropertyId === d.property_id ?
		    	[255, 255, 0, 255] :
		    	d[currentPriceString] > topLimit ?
		    	[166, 166, 244, 120] :
		    	d[currentPriceString] < bottomLimit ?
		    	[255, 0, 0, 120] :
		    	[57, 181, 74, 120],
		    // onHover,
		    // onClick: (info: any) => onClick(info),
		  });
	return (
		<PointsLayerContext.Provider value={{ pointsLayer }}>
			{children}
		</PointsLayerContext.Provider>
	)
}

PointsLayerContext.displayName = "PointsLayerContext";