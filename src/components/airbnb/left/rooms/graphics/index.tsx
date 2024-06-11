// App imports
import { Gauge } from './gauge';
import { Legend } from './legend';
import './styles.scss';

export const Graphics = ({ roomsData, dsvData }: any) => {
	return (
		<div className="rooms-wrapper">
			<Legend roomsData={roomsData}/>
			<Gauge roomsData={roomsData}/>
		</div>
	)
}

Graphics.displayName="Graphics";