// App Imports
import { Header } from '../header';
import { Property } from './property';
import { Prices } from './prices';
import { Table } from './table';
import { Footer } from '../footer';
import './styles.scss';

// Context imports
import { useLinesApi } from '../../context/api/imoveis/lines';
import { usePricesApi } from '../../context/api/imoveis/prices';

export const Page1 = ({ page1Ref, setActivePdf }: any) => {
	const { linesData } = useLinesApi();
	const { pricesData } = usePricesApi();

	if (!linesData || !pricesData) return <></>

	return (
		<div 
			className="user-pdf-first-page" 
			onClick={(e: any) => e.stopPropagation()}
			ref={page1Ref}
		>
			<div className="pdf-body">
				<img
					className="pdf-exit-cancel-cross"
					src="static/logos/cancel_search.svg" 
					alt="search-icon"
					onClick={() => setActivePdf(false)}
				/>
				<Header/>
				<Property/>
				<Prices/>
				<Table linesData={linesData} pricesData={pricesData}/>
			</div>
			<Footer/>
		</div>
	)
}

Page1.displayName="Page1";