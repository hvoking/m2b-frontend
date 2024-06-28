// App imports
import { Footer } from '../footer';
import { Table } from './table'
import { Property } from './property';
import { Prices } from './prices';
import { priceFormat } from '../../utils/constants';
import './styles.scss';


// Context imports
import { useLinesApi } from '../../context/api/imoveis/lines';
import { usePricesApi } from '../../context/api/imoveis/prices';
import { usePrices } from '../../context/filters/prices';
import { usePdf } from '../../context/filters/pdf';

export const Page2 = ({ page2Ref, printDocument, setActivePdf }: any) => {
	const { linesData } = useLinesApi();
	const { pricesData } = usePricesApi();
	const { samplesPrices } = usePrices();

	if (!linesData || !pricesData) return <></>

	const onClick = (e: any) => {
		e.stopPropagation()
	}

	const mean = (arr: any) => {
	    if (arr.length === 0) return 0;
	    const filteredArr = arr.filter(Number.isFinite); // Remove non-numeric values
	    if (filteredArr.length === 0) return 0; // Handle case where all values are non-numeric
	    const sum = filteredArr.reduce((acc: any, val: any) => acc + val, 0);
	    return sum / filteredArr.length;
	};

	const meanPrice = samplesPrices && priceFormat(Math.round(mean(samplesPrices)));

	const currentDate = new Date().toLocaleDateString('pt-BR');
	
	return (
		<div 
			ref={page2Ref} 
			className="user-pdf-first-page" 
			onClick={(e: any) => onClick(e)}
		>
			<div className="pdf-body-page2">
				<img
					className="pdf-exit-cancel-cross"
					src="static/logos/cancel_search.svg" 
					alt="search-icon"
					onClick={() => setActivePdf(false)}
				/>
				<div className="pdf-header-wrapper">
					<div>{currentDate}</div>
					<div className="pdf-header-subtitle">
						Características do Imóvel
					</div>
				</div>
				<Property/>
				<Prices/>
				<Table linesData={linesData} pricesData={pricesData}/>
				<div className="pdf-cta">
					<div>Valor de avaliação sugerido R$ {meanPrice}</div>
					<div className="pdf-button" onClick={printDocument}>Gerar relatório</div>
				</div>
			</div>
			<Footer/>
		</div>
	)
}

Page2.displayName="Page2";