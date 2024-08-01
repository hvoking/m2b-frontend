// React imports
import { useCallback } from 'react';

// App imports
import { Controllers } from './controllers';
import { Pin } from './pin';
import { Tooltip } from './tooltip';
import { Layers } from './layers';
import { IsoPolygon } from './iso';
import { HeatmapLayer } from './heatmap';
import { Buildings } from './buildings';
import { CustomMarker } from './marker';
import { PointsLayer } from './points';

// Context imports
import { useMapbox } from '../../context/maps/mapbox';
import { useGeo } from '../../context/filters/geo';
import { useIsoPolygonApi } from '../../context/api/isoPolygon';
import { usePricesLimits } from '../../context/limits/prices';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapContainer = () => {
	const { mapRef, currentBasemap } = useMapbox();
	const { viewport, setMarker, setPlaceCoordinates } = useGeo();
	const { setInitialMarker } = useIsoPolygonApi();
	const { filterPrices } = usePricesLimits();

	const onDblClick = useCallback((event: any) => {
		const lng = event.lngLat.lng;
		const lat = event.lngLat.lat;
		setInitialMarker(false);
		setPlaceCoordinates({ longitude: lng, latitude: lat });
		setMarker({ longitude: lng, latitude: lat });
	}, []);

	return (
		<Map
			ref={mapRef}
			initialViewState={viewport}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
			mapStyle={currentBasemap}
			onDblClick={onDblClick}
			doubleClickZoom={false}
			antialias={true}
			preserveDrawingBuffer={true}
		>
			{/*<CustomMarker filterProperties={filterPrices}/>*/}
			<IsoPolygon/>
			<Buildings/>
			<HeatmapLayer/>
			<PointsLayer/>
			{/*<Layers/>*/}
			<Pin/>
			<Controllers/>
			<Tooltip/>
		</Map>
	)
}

MapContainer.displayName="MapContainer";