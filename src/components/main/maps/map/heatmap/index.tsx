// Context imports
import { useHistPointsApi } from '../../../context/api/imoveis/histPoints';
import { useCategory } from '../../../context/filters/category';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const HeatmapLayer = () => {
	const { histPointsData } = useHistPointsApi();
    const { categoryId } = useCategory();

	if (!histPointsData) return <></>

	const features = histPointsData.map((item: any) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: item.geometry.coordinates
			},
			properties: {
				visits: item.visits 
			}
		}));

	const heatmapSource: any = {
		    type: 'geojson',
		    data: {
		      type: 'FeatureCollection',
		      features: features
		    },
		};

	const heatmapLayer: any = {
	    id: 'heatmapLayer',
	    type: 'heatmap',
	    source: 'heatmapSource',
	    paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'visits'],
                0,
                0,
                6,
                1
            ],
            // Increase the heatmap color weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                9,
                3
            ],
            // Color ramp for heatmap. Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparency color
            // to create a blur-like effect.
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                2,
                12,
                20
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                0,
                16,
                1
            ]
        }
    };
	
	return (
		<Source id="heatmapSource" {...heatmapSource}>
			{categoryId === 2 && <Layer {...heatmapLayer}/>}
		</Source>
	)
}