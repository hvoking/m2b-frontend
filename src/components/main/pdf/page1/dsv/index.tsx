// App imports
import { Bars } from './bars';
import { LoadingImage } from '../../../utils/loading'

// Context imports
import { useDsvApi } from '../../../context/api/imoveis/dsv';

export const Dsv = () => {
	const { dsvData } = useDsvApi();
	
	return (
		<div>
			<div className="sidebar-sub-title">
				Dormitórios-Suítes-Vagas (DSV)
			</div>
			{dsvData ? <Bars dsvData={dsvData}/> : <LoadingImage/>}
		</div>
	)
} 

Dsv.displayName="Dsv";