// App imports
import { PdfMaps } from './maps';
import { PdfObs } from './obs';
import { Header } from './header';
import { Footer } from '../footer';
import './styles.scss';


export const Page2 = ({ page2Ref, setActivePdf }: any) => {
	const onClick = (e: any) => {
		e.stopPropagation()
	}
	
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
				<Header/>
				<PdfMaps/>
				<PdfObs/>
			</div>
			<Footer/>
		</div>
	)
}

Page2.displayName="Page2";