// App imports
import './styles.scss';

export const PdfFooter = () => {
	return (
		<div className="pdf-footer">
			<div className="m2b-letters">m²b</div>
			<div></div>
			<div className="data-provider-logo">
				<div>Data source: </div>
				<a 
					href="https://insideairbnb.com/london/"
					style={{display: "table-cell"}}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div>Inside Airbnb</div>
				</a>
			</div>
		</div>
	)
}

PdfFooter.displayName="PdfFooter";