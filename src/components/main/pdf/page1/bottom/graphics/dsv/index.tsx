// App imports
import { Gauge } from './gauge';
import { Bars } from './bars';
import './styles.scss';

// Context imports
import { useRoomsApi } from '../../../../../context/api/imoveis/rooms';
import { useDsvApi } from '../../../../../context/api/imoveis/dsv';

export const Dsv = () => {
	const { dsvData } = useDsvApi();
	const { roomsData } = useRoomsApi();
	if (!dsvData || !roomsData) return <></>
	
	return (
		<div className="pdf-graphics-item-wrapper">
			<div>Anúncios por Dormitórios-Suítes-Vagas</div>
			<div className="pdf-dsv-wrapper">
				<Gauge roomsData={roomsData} dsvData={dsvData}/>
				<Bars dsvData={dsvData}/>
			</div>
		</div>
	)
} 

Dsv.displayName="Dsv";