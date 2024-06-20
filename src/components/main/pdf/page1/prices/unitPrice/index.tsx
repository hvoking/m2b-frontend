// App imports
import './styles.scss';

export const PdfUnitPrice = ({unitPriceMin, unitPriceMean, unitPriceMax}: any) => {
	return (
		<>
			<div className="pdf-title">Faixa de valores (m²)</div>
			<div className="pdf-unit-price">
				<div>
					<div className="pdf-unit-price-value" style={{
						backgroundColor: "rgba(68, 27, 30, 1)",
						border: "3px solid rgba(229, 37, 33, 1)",
					}}>
						{unitPriceMin}
					</div>
					<div style={{fontSize: "0.8em"}}>baixo</div>
				</div>
				<div>
					<div className="pdf-unit-price-value"  style={{
						backgroundColor: "rgba(21, 59, 39, 1)",
						border: "3px solid rgba(72, 174, 77, 1)",
					}}>
						{unitPriceMean}
					</div>
					<div style={{fontSize: "0.8em"}}>medio</div>
				</div>
				<div>
					<div className="pdf-unit-price-value"  style={{
						backgroundColor: "rgba(42, 43, 96, 1)",
						border: "3px solid rgba(166, 164, 210, 1)",
					}}>
						{unitPriceMax}
					</div>
					<div style={{fontSize: "0.8em"}}>alto</div>
				</div>
			</div>
		</>
	)
}

PdfUnitPrice.displayName="PdfUnitPrice";