// React imports
import { useState, useCallback } from 'react';

// App imports
import { Pin } from './pin';
import { Buildings } from './buildings';
import { MapControllers } from './controllers';
import { PanSelector } from './pan';

// Context imports
import { useMapbox } from '../../../context/maps/mapbox';
import { useGeo } from '../../../context/filters/geo';
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';

// Layers imports
import { useIconLayer } from '../../../context/maps/layers/icon';

// Third-party imports
import { Map, useControl } from 'react-map-gl';
import { DeckProps } from '@deck.gl/core/typed';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import 'mapbox-gl/dist/mapbox-gl.css';

const DeckGLOverlay = (props: DeckProps) => {
  const deck = useControl<any>(() => new MapboxOverlay(props));
  deck.setProps(props);
  return null;
}

export const PdfMaps = () => {
	const { pdfMapRef } = useMapbox();
	const { viewport, setMarker, setPlaceCoordinates } = useGeo();
	const { setInitialMarker } = useIsoPolygonApi();
	const [ activePan, setActivePan ] = useState(false);

	// Layers
	const { iconLayer } = useIconLayer();

	const layers: any = [ iconLayer ];

	const onDblClick = useCallback((event: any) => {
		const lng = event.lngLat.lng;
		const lat = event.lngLat.lat;
		setInitialMarker(false);
		setPlaceCoordinates({ longitude: lng, latitude: lat });
		setMarker({ longitude: lng, latitude: lat });
	}, []);

	return (
		<div style={{position: "relative"}}>
		<Map
			ref={pdfMapRef}
			initialViewState={{...viewport, bearing: 0, pitch: 0}}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
			mapStyle="mapbox://styles/mapbox/light-v10"
			onDblClick={onDblClick}
			doubleClickZoom={false}
			dragPan={activePan}
			antialias={true}
			preserveDrawingBuffer={true}
		>
			<DeckGLOverlay 
				layers={layers} 
				glOptions={{preserveDrawingBuffer: true}}
			/>
			<Pin/>
			<Buildings/>
			<MapControllers/>
		</Map>
		<PanSelector setActivePan={setActivePan}/>
		</div>
	)
}

PdfMaps.displayName="PdfMaps";