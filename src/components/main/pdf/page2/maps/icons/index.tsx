// Context imports
import { useTooltip } from '../../../../context/maps/tooltip';
import { usePrices } from '../../../../context/filters/prices';
import { usePropertyType } from '../../../../context/filters/property';
import { useLinesLimits } from '../../../../context/limits/lines';
import { usePointsLimits } from '../../../../context/limits/points';

// Third party imports
import { Source, Layer } from 'react-map-gl';
import * as d3 from 'd3';

export const IconsLayer = () => {
	const { unitPrice } = usePrices();
	const { setPropertyInfo, setActivePropertyInfo } = useTooltip();
	const { currentPropertyId, setCurrentPropertyId } = usePropertyType();
	const { bottomLimit, topLimit } = useLinesLimits();
	const { filterPoints } = usePointsLimits();

	if (!filterPoints) return <></>

	const currentPriceString = unitPrice === "price" ? "price" : "unit_price";
	const prices = filterPoints.map((item: any) => item[currentPriceString]);

	const minPrice: any = d3.min(prices);
	const maxPrice: any = d3.max(prices)

	const pricesScale = d3.scaleLinear()
		.domain([minPrice, maxPrice])
		.range([1, 100])

	const iconsLayer: any = {
	    id: 'price-icon',
	    type: 'circle',
	    source: 'iconsSource',
	    paint: {
	      'circle-radius': [
	        'interpolate',
	        ['linear'],
	        ['get', 'size'],
	        1, 2, // Min size
	        100, 6 // Max size, adjust as needed
	      ],
	      'circle-color': ['get', 'markerColor'],
	    },
	  };

	const iconsSource: any = {
		type: 'geojson',
	    data: {
		    type: 'FeatureCollection',
		    features: filterPoints.map((d: any) => ({
		      type: 'Feature',
		      geometry: {
		        type: 'Point',
		        coordinates: d.geometry.coordinates,
		      },
		      properties: {
		        propertyId: d.property_id,
		        price: d[currentPriceString],
		        size: pricesScale(d[currentPriceString]),
		        markerColor:
		          currentPropertyId && currentPropertyId === d.property_id
		            ? 'yellow'
		            : d[currentPriceString] >= topLimit
		            ? 'blue'
		            : d[currentPriceString] < bottomLimit
		            ? 'red'
		            : 'green',
		      },
		    })),
		  }
		}

	return (
		<Source id="iconsSource" {...iconsSource}>
			<Layer {...iconsLayer}/>
		</Source>
	)
}