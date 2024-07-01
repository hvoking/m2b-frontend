// App Imports
import { Rooms } from './rooms';
import { Dsv } from './dsv';
import './styles.scss';

export const Graphics = () => {
	return (
		<div className="pdf-graphics-wrapper">
			<Rooms/>
			<Dsv/>
		</div>
	)
}

Graphics.displayName="Graphics";