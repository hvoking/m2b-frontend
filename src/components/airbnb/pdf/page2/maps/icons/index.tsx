// Context imports
import { useTooltip } from '../../../../context/maps/tooltip';
import { usePropertyType } from '../../../../context/filters/property';
import { useLinesLimits } from '../../../../context/limits/lines';
import { usePointsLimits } from '../../../../context/limits/points';

// Third party imports
import { Source, Layer } from 'react-map-gl';
import * as d3 from 'd3';

export const IconsLayer = () => {
	const { setPropertyInfo, setActivePropertyInfo } = useTooltip();
	const { currentPropertyId, setCurrentPropertyId } = usePropertyType();
	const { bottomLimit, topLimit } = useLinesLimits();
	const { filterPoints } = usePointsLimits();

	if (!filterPoints) return <></>

	const prices = filterPoints.map((item: any) => item['price']);

	// const onClick = (info: any) => {
  	// 	setActivePropertyInfo(true);
  	// 	info.object && setPropertyInfo(info.object);
  	// };

  	// const onHover = (info: any) => {
  	// 	info.object && setCurrentPropertyId(info.object.property_id);
  	// 	!info.object && setCurrentPropertyId(null);
  	// }

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
	        1, 3, // Min size
	        100, 9 // Max size
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
		        price: d['price'],
		        size: pricesScale(d['price']),
		        markerColor:
		          currentPropertyId && currentPropertyId === d.property_id
		            ? 'rgba(255, 255, 0, 1)'
		            : d['price'] >= topLimit
		            ? 'rgba(166, 166, 244, 1)'
		            : d['price'] < bottomLimit
		            ? 'rgba(255, 0, 0, 1)'
		            : 'rgba(67, 181, 64, 1)',
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