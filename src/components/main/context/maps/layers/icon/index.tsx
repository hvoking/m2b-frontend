// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useTooltip } from '../../../maps/tooltip';
import { usePrices } from '../../../filters/prices';
import { usePropertyType } from '../../../filters/property';
import { useLinesLimits } from '../../../limits/lines';
import { usePointsLimits } from '../../../limits/points';

// Third party imports
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { IconLayer } from 'deck.gl';

const IconLayerContext: React.Context<any> = createContext(null)

export const useIconLayer = () => {
	return (
		useContext(IconLayerContext)
	)
}

export const IconLayerProvider = ({children}: any) => {
	const { unitPrice } = usePrices();
	const { setPropertyInfo } = useTooltip();
	const { currentPropertyId, setCurrentPropertyId } = usePropertyType();
	const { bottomLimit, topLimit } = useLinesLimits();
	const { filterPoints } = usePointsLimits();

	const currentPriceString = 
  		unitPrice === "price" ? 
  		"price" : 
  		"unit_price";

  	const onClick = (info: any) => {
  		info.object && setPropertyInfo(info.object);
  	};

  	const onHover = (info: any) => {
  		info.object && setCurrentPropertyId(info.object.property_id);
  		!info.object && setCurrentPropertyId(null);
  	}

	const iconMapping = 'static/components/pdf/maps/location-icon-mapping.json';
	const iconAtlas = 'static/components/pdf/maps/location-icon-atlas.png';

	const iconLayer = filterPoints &&
		new IconLayer({
			id: 'price-icon',
			data: filterPoints,
			pickable: true,
			getPosition: (d: any) => [d.longitude, d.latitude],
			iconAtlas,
			iconMapping,
			getIcon: (d: any) => 
				currentPropertyId && currentPropertyId === d.property_id ?
				"marker-yellow" :
				d[currentPriceString] >= topLimit ?
				"marker-blue" :
				d[currentPriceString] < bottomLimit ?
				"marker-red" :
				"marker-green",
			getSize: (d: any) => unitPrice === "price" ? d.price / 200000 : d.unit_price / 2000,
			sizeUnits: 'meters',
			sizeScale: 12,
			sizeMinPixels: 6,
			onHover,
			onClick: (info: any) => onClick(info)
		});
	return (
		<IconLayerContext.Provider value={{ iconLayer }}>
			{children}
		</IconLayerContext.Provider>
	)
}

IconLayerContext.displayName = "IconLayerContext";