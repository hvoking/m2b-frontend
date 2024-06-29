// App imports
import { Bars } from './bars';
import { LoadingImage } from '../../../utils/loading'

// Context imports
import { useDsvApi } from '../../../context/api/imoveis/dsv';

export const Dsv = () => {
	const { dsvData } = useDsvApi();
	if (!dsvData) return <></>
	
	return (
		<div style={{display: "grid", gridTemplateRows: "30px auto"}}>
			<div style={{paddingTop: "10px"}}>
				Dormitórios-Suítes-Vagas (DSV)
			</div>
			<div style={{display: "grid", overflow: "hidden"}}>
				<Bars dsvData={dsvData}/>
			</div>
		</div>
	)
} 

Dsv.displayName="Dsv";