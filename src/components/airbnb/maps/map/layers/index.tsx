// Layers imports
import { usePointsLayer } from '../../../context/maps/layers/points';

// Third-party imports
import { useControl } from 'react-map-gl';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import type { DeckProps } from '@deck.gl/core/typed';

const DeckGLOverlay = (props: DeckProps) => {
  const deck = useControl<any>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export const Layers = () => {
	const { pointsLayer } = usePointsLayer();

	const layers: any = [ pointsLayer ];

	return (
		<DeckGLOverlay 
			layers={layers} 
			glOptions={{preserveDrawingBuffer: true}}
		/>
	)
}