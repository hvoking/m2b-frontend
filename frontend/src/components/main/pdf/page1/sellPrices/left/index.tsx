export const Left = ({ samplesData, siFormat, currentUnit }: any) => {
	const valorAnuncio = samplesData && Math.round(samplesData.mean_price);

	return (
		<div>
			<div className="sell-prices-title">
				Valor sugerido {currentUnit}
			</div>
			<div className="sell-prices-subtitle">
				calculado sobre as amostras
			</div>
			<div className="sell-prices-price">
				R$ {siFormat(valorAnuncio).replaceAll(',', '.')}
			</div>
		</div>
	)
}

Left.displayName="Left";