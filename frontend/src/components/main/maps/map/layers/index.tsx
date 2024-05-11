// Layers imports
import { useIsoLayer } from '../../../context/maps/layers/iso';
import { useCitiesLayer } from '../../../context/maps/layers/cities';
import { usePointsLayer } from '../../../context/maps/layers/points';
import { useHeatmapLayer } from '../../../context/maps/layers/heatmap';

// Third-party imports
import { useControl } from 'react-map-gl';
import { DeckProps } from '@deck.gl/core/typed';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';

const DeckGLOverlay = (props: DeckProps) => {
  const deck = useControl<any>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export const Layers = () => {
	const { isoLayer } = useIsoLayer();
	const { citiesLayer } = useCitiesLayer();
	const { pointsLayer } = usePointsLayer();
	const { heatmapLayer } = useHeatmapLayer();

	const layers: any = [ citiesLayer, isoLayer, pointsLayer, heatmapLayer ];

	return (
		<DeckGLOverlay 
			layers={layers} 
			glOptions={{preserveDrawingBuffer: true}}
		/>
	)
}