// React imports
import { useState, useCallback } from 'react';

// App imports
import { Pin } from './pin';
import { Buildings } from './buildings';
import { MapControllers } from './controllers';
import { PanSelector } from './pan';
import { IconsLayer } from './icons';

// Context imports
import { useMapbox } from '../../../context/maps/mapbox';
import { useGeo } from '../../../context/filters/geo';
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';

// Third-party imports
import { Map, useControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const PdfMaps = () => {
	const { pdfMapRef } = useMapbox();
	const { viewport, setMarker, setPlaceCoordinates } = useGeo();
	const { setInitialMarker } = useIsoPolygonApi();
	const [ activePan, setActivePan ] = useState(false);

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
			<IconsLayer/>
			<Pin/>
			<Buildings/>
			<MapControllers/>
		</Map>
		<PanSelector setActivePan={setActivePan}/>
		</div>
	)
}

PdfMaps.displayName="PdfMaps";