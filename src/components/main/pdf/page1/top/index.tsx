// App Imports
import { Header } from './header';
import { Address } from './address';
import { PdfMaps } from './maps';

export const Top = () => {
	return (
		<div className="page1-top">
			<Header/>
			<Address/>
			<PdfMaps/>
		</div>
	)
}

Top.displayName="Top";