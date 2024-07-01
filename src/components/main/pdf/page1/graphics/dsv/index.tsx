// App imports
import { Bars } from './bars';
import { LoadingImage } from '../../../../utils/loading'

// Context imports
import { useDsvApi } from '../../../../context/api/imoveis/dsv';

export const Dsv = () => {
	const { dsvData } = useDsvApi();
	if (!dsvData) return <></>
	
	return (
		<div 
			style={{
				display: "grid", 
				gridTemplateRows: "30px auto", 
				paddingRight: "20px",
			}}>
			<div style={{paddingTop: "5px"}}>Dormitórios-Suítes-Vagas</div>
			<Bars dsvData={dsvData}/>
		</div>
	)
} 

Dsv.displayName="Dsv";