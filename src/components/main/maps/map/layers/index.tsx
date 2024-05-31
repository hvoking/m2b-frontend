// Layers imports
import { useIsoLayer } from '../../../context/maps/layers/iso';
import { usePointsLayer } from '../../../context/maps/layers/points';
import { useHeatmapLayer } from '../../../context/maps/layers/heatmap';

// Third-party imports
import { useControl } from 'react-map-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';

// Type imports
import type { DeckProps } from '@deck.gl/core';

const DeckGLOverlay = (props: DeckProps) => {
  const deck = useControl<any>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export const Layers = () => {
	const { isoLayer } = useIsoLayer();
	const { pointsLayer } = usePointsLayer();
	const { heatmapLayer } = useHeatmapLayer();

	const layers: any = [ isoLayer, pointsLayer, heatmapLayer ];

	return (
		<DeckGLOverlay 
			layers={layers} 
			glOptions={{preserveDrawingBuffer: true}}
		/>
	)
}