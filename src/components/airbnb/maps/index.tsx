// App imports
import { MapHeader } from './header';
import { Pictures } from './pictures';
import { BasemapsSelectors } from './basemaps';
import { MapContainer } from './map';
import { SvgMap } from './svgMap';
import './styles.scss';

export const Maps = () => {
	return (
		<div className="map-wrapper">
			<MapHeader/>
			<SvgMap/>
			<MapContainer/>
			<BasemapsSelectors/>
			<Pictures/>
		</div>
	)
}

Maps.displayName="Maps";