// React imports
import { useState, useCallback } from 'react';

// App imports
import { Pin } from './pin';
import { Controllers } from './controllers';
import { Buildings } from './buildings';
import { IsoPolygon } from './iso';
import './styles.scss';

// Context imports
import { useMapbox } from '../../../context/maps/mapbox';
import { useGeo } from '../../../context/filters/geo';
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';
import { useIconLayer } from '../../../context/maps/layers/icon';

// Third-party imports
import { DeckProps } from '@deck.gl/core/typed';
import { MapboxOverlay } from '@deck.gl/mapbox/typed';
import { Map, useControl } from 'react-map-gl';
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
				initialViewState={{...viewport}}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
				mapStyle="mapbox://styles/mapbox/light-v10"
				onDblClick={onDblClick}
				doubleClickZoom={false}
				antialias={true}
				preserveDrawingBuffer={true}
			>
				<DeckGLOverlay 
					layers={layers} 
					glOptions={{preserveDrawingBuffer: true}}
				/>
				<IsoPolygon/>
				<Buildings/>
				<Pin/>
				<Controllers/>
			</Map>
			<div 
				style={{
					position: "absolute", 
					top: "10px", 
					left: "20px", 
					display: "grid", 
					gridGap: "5px",
					gridTemplateColumns: "min-content min-content min-content 100px 100px 100px"
				}}>
					<div className="boundary-controller">
						<img src="static/components/pdf/maps/icons/pencil.svg" alt="pencil" width="100%"/>
					</div>
					<div className="boundary-controller">
						<img src="static/components/pdf/maps/icons/polygon.svg" alt="polygon" width="100%"/>
					</div>
					<div className="boundary-controller">
						<img src="static/components/pdf/maps/icons/circle.svg" alt="circle" width="100%"/>
					</div>
					<div></div>
					<div></div>
					<div></div>
				</div>
		</div>
	)
}

PdfMaps.displayName="PdfMaps";