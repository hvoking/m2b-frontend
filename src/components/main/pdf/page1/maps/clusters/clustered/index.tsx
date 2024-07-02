// Third-party imports
import { Source, Layer } from 'react-map-gl';

export const Clustered = ({ id, currentPoints, color }: any) => {
	const pointsSource: any = {
		id: `${id}Source`,
		type: 'geojson',
	    data: {
		    type: 'FeatureCollection',
		    features: currentPoints.map((d: any) => ({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: d.geometry.coordinates,
				},
				properties: {
					cluster: false
				},
			})),
		}
	}

	const pointsLayer: any = {
	    id: id,
	    type: 'circle',
	    source: `${id}Source`,
	    minzoom: 13,
	    maxzoom: 15,
	    paint: {
		'circle-radius': [
			'step', ['get', 'point_count'], 
			12, 20, 
			14, 40, 
			16, 60,
			18, 80,
			20, 100,
			22
		],
	      'circle-color': color,
	    },
	  };

	const textLayer: any = {
		id: `${id}Source`,
		type: 'symbol',
		minzoom: 13,
		maxzoom: 15,
		source: `${id}-clusters`,
		filter: ['has', 'point_count'],
		layout: {
			'text-field': '{point_count_abbreviated}',
			'text-size': 12,
			'text-font': ['Montserrat Bold'],
		},
		paint: {
        	'text-color': '#FFFFFF'
    	}
	};

	return (
		<Source 
			{...pointsSource}
			cluster={true}
			clusterMaxZoom={16}
			clusterRadius={100}
		>
			<Layer {...pointsLayer}/>
			<Layer {...textLayer}/>
		</Source>
	)
}