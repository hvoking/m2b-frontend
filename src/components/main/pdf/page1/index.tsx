// App Imports
import { Header } from './header';
import { Footer } from '../footer';
import { PdfMaps } from './maps';
import { Address } from './address';
import { Rooms } from './rooms';
import { Dsv } from './dsv';
import './styles.scss';

export const Page1 = ({ page1Ref, setActivePdf }: any) => {

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
				<Address/>
				<PdfMaps/>
				<div className="pdf-header-subtitle" style={{paddingLeft: "20px", paddingTop: "5px"}}>
					Características da Região
				</div>
				<div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
					<Rooms/>
					<Dsv/>
				</div>
			</div>
			<Footer/>
		</div>
	)
}

Page1.displayName="Page1";