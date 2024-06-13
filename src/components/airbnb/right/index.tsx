// App imports
import { Pictures } from './pictures';
import './styles.scss';

// Context imports
import { useLinesApi } from '../context/api/imoveis/lines';
import { usePricesApi } from '../context/api/imoveis/prices';

export const Right = () => {
	const { linesData } = useLinesApi();
	const { pricesData } = usePricesApi();

	if (!linesData || !pricesData) return <></>

	return (
		<div className="right">
			<div className="right-wrapper">
				
				<Pictures 
					linesData={linesData} 
					pricesData={pricesData}
				/>
			</div>
		</div>
	)
}

Right.displayName="Right";