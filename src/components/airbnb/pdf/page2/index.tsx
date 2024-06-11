// App imports
import { PdfMaps } from './maps';
import { PdfObs } from './obs';
import './styles.scss';

// Pdf imports
import { PdfFooter } from '../footer';

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
				<div className="pdf-header-wrapper">
					<div className="pdf-header-title">
						Inside Airbnb Metrics
					</div>
					<div 
						className="property-data-subtitle" 
						style={{fontWeight: "600"}}
					>
						<img 
							src="static/components/maps/marker.svg" 
							alt="marker" 
							width="10px"
						/>
						<div>Property Location</div>
					</div>
				</div>
				<PdfMaps/>
				<PdfObs/>
			</div>
			<PdfFooter/>
		</div>
	)
}

Page2.displayName="Page2";