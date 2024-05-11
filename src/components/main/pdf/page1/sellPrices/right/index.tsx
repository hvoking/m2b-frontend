// Context imports
import { usePropertyType } from '../../../../context/filters/property';
import { usePrices } from '../../../../context/filters/prices';

export const Right = ({ samplesData, siFormat, currentUnit }: any) => {
	const { businessTypeId } = usePropertyType();
	const { discount } = usePrices();

	const valorVenda = samplesData && Math.round(samplesData.final_price);
	const discountString = 
		discount > 0 ? 
		`${discount}% sobre o valor sugerido` :
		`${discount*-1}% de desconto`;
		
	return (
		<div>
			<div className="sell-prices-title">
				Valor de {businessTypeId === 1 ? "venda" : "locação"} {currentUnit}
			</div>
			<div className="sell-prices-subtitle">
				previsto {discountString}
			</div>
			<div className="sell-prices-price">
				R$ {siFormat(valorVenda).replaceAll(',', '.')}
			</div>
		</div>
	)
}

Right.displayName="Right";