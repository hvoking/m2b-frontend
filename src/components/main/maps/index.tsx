// App imports
import { MapHeader } from './header';
import { SvgMap } from './svgMap';
import { Pictures } from './pictures';
import { BasemapsSelectors } from './basemaps';
import { MapContainer } from './map';

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