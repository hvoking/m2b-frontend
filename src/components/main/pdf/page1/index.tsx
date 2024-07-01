// App Imports
import { Header } from './header';
import { Footer } from '../footer';
import { PdfMaps } from './maps';
import { Address } from './address';
import { Graphics } from './graphics';
import { Info } from './info';
import { Title } from './title';
import { CancelCross } from './cross';
import './styles.scss';

export const Page1 = ({ page1Ref, setActivePdf }: any) => {
	return (
		<div 
			className="user-pdf-first-page" 
			onClick={(e: any) => e.stopPropagation()}
			ref={page1Ref}
		>
			<div className="pdf-body">
				<CancelCross setActivePdf={setActivePdf}/>
				<Header/>
				<Address/>
				<PdfMaps/>
				<Info/>
				<Title/>
				<Graphics/>
			</div>
			<Footer/>
		</div>
	)
}

Page1.displayName="Page1";