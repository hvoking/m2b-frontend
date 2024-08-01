// Third-party imports
import { Source, Layer } from 'react-map-gl';
import * as d3 from 'd3';

const siFormat = (tickValue: any) => d3.format(".2s")(tickValue).replace('G', 'B');
const priceFormat = (tickValue: any) => siFormat(tickValue).replace('G', 'B');

export const Clustered = ({ id, currentPoints, color, currentPriceString }: any) => {

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
					cluster: false,
					price: d[currentPriceString],
					formatedPrice: priceFormat(d[currentPriceString])
				},
			})),
		}
	}

	const pointsLayer: any = {
	    id: id,
	    type: 'circle',
	    source: `${id}Source`,
	    paint: {
		'circle-radius': [
			'step', ['get', 'point_count'], 
			17, 20, 
			20, 40, 
			22, 60, 
			25
		],
	      'circle-color': color,
	    },
	  };

	const textLayer: any = {
		id: `${id}-text`,
		type: 'symbol',
		source: `${id}-clusters`,
		filter: ['has', 'point_count'],
		layout: {
			'text-field': [
			    'concat', 
			    'R$ ', 
			    [
			        'case',
			        ['>=', ['/', ['get', 'mean_price'], ['get', 'point_count']], 1000000],
			        ['concat', ['to-string', ['number-format', ['/', ['/', ['get', 'mean_price'], ['get', 'point_count']], 1000000], { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }]], 'M'],

			        ['>=', ['/', ['get', 'mean_price'], ['get', 'point_count']], 1000],
			        ['concat', ['to-string', ['round', ['/', ['/', ['get', 'mean_price'], ['get', 'point_count']], 1000]]], 'k'],

			        ['to-string', ['round', ['/', ['get', 'mean_price'], ['get', 'point_count']]]]
			    ]
			],
			'text-size': 10,
			'text-font': ['Ubuntu Bold'],
			'text-anchor': "center"
		},
		paint: {
			'text-color': "#FFFFFF",
		}
	};

	return (
		<Source 
			{...pointsSource}
			cluster={true}
			clusterMaxZoom={16}
			clusterRadius={120}
			clusterProperties={{
				mean_price: ['+', ['get', 'price']],
				point_count: ['+', 1]
			}}
		>
			<Layer {...pointsLayer}/>
			<Layer {...textLayer}/>
		</Source>
	)
}