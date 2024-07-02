// App imports
import { Gauge } from './gauge';
import { Bars } from './bars';
import './styles.scss';

// Context imports
import { useDsvApi } from '../../../../context/api/imoveis/dsv';
import { useRoomsApi } from '../../../../context/api/imoveis/rooms';

export const Dsv = () => {
	const { dsvData } = useDsvApi();
	const { roomsData } = useRoomsApi();
	if (!dsvData || !roomsData) return <></>
	
	return (
		<div className="pdf-graphics-item-wrapper">
			<div>Dormitórios-Suítes-Vagas</div>
			<div className="pdf-dsv-wrapper">
				<Bars dsvData={dsvData}/>
				<Gauge roomsData={roomsData} dsvData={dsvData}/>
			</div>
		</div>
	)
} 

Dsv.displayName="Dsv";