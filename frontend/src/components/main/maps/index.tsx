// App imports
import { MapHeader } from './header';
import { IsoPolygonSVG } from './svgMap';
import { Pictures } from './pictures';
import { BasemapsSelectors } from './basemaps';
import { MapContainer } from './map';
import './styles.scss';

export const Maps = () => {
	return (
		<div className="map-wrapper">
			<MapHeader/>
			<IsoPolygonSVG/>
			<MapContainer/>
			<BasemapsSelectors/>
			<Pictures/>
		</div>
	)
}

Maps.displayName="Maps";