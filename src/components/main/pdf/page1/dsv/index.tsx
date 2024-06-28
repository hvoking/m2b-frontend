// App imports
import { Bars } from './bars';
import { LoadingImage } from '../../../utils/loading'

// Context imports
import { useDsvApi } from '../../../context/api/imoveis/dsv';

export const Dsv = () => {
	const { dsvData } = useDsvApi();
	if (!dsvData) return <></>
	
	return (
		<div>
			<div className="sidebar-sub-title">
				Dormitórios-Suítes-Vagas (DSV)
			</div>
			<div style={{display: "grid", width: "100%", height: "100%"}}>
			<Bars dsvData={dsvData}/>
			</div>
		</div>
	)
} 

Dsv.displayName="Dsv";