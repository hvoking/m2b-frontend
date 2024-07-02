// Context imports
import { usePointsLimits } from '../../../../context/limits/points';

// Third party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

const roomsColors: any = {
	"4": 'rgba(254, 162, 90, 1)',
	"3": 'rgba(65, 145, 198, 1)',
	"2": 'rgba(84, 181, 103, 1)',
	"1": 'rgba(109, 86, 166, 1)',
}

export const Points = () => {
	const { filterPoints } = usePointsLimits();

	const unclusteredPointLayer: LayerProps = {
	  id: 'unclustered-point',
	  type: 'circle',
	  source: 'properties-points',
	  filter: ['!', ['has', 'point_count']],
	  paint: {
	    'circle-color': ['get', 'color'],
	    'circle-radius': 5,
	  }
	};
	

	const geojsonPoints: any = filterPoints && filterPoints.reduce((total: any, item: any) => {
		total.push({
			type: "Feature",
			properties: {
				cluster: false,
		        color: roomsColors[item.rooms]
	    	},
		    geometry: { 
		    	type: "Point", 
		    	coordinates: [ 
		    		item.geometry.coordinates[0], 
		    		item.geometry.coordinates[1] 
		    	] 
		    }
		});
		return total
	}, []);

	const geojsonWrapper: any = geojsonPoints && {
		"type": "FeatureCollection",
		"features": geojsonPoints
	}

	return (
		<Source
		  id="properties-points"
		  type="geojson"
		  data={geojsonWrapper}
		  cluster={true}
		  clusterMaxZoom={14}
		  clusterRadius={100}
		  clusterProperties={{
		  	'color': ['get', 'color'],
		  	'label': ['get', 'label'],
		  }}
		>
		  <Layer {...unclusteredPointLayer}/>
		</Source>
	)
}

Points.displayName="Points";