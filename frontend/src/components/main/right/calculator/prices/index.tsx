// React imports
import { useState } from 'react';

// App imports
import { Formula } from './formula';
import './styles.scss';

// Context imports
import { useSamplesApi } from '../../../context/api/imoveis/samples';
import { usePrices } from '../../../context/filters/prices';
import { usePropertyType } from '../../../context/filters/property';

// Third-party imports
import * as d3 from 'd3';

export const PropertyPrices = () => {
	const { samplesData } = useSamplesApi();
	const { discount, setDiscount } = usePrices();
	const { businessTypeId } = usePropertyType();

	const siFormat = d3.format(",");
	const priceMean = samplesData && Math.round(samplesData.mean_price);
	const valorVenda = samplesData && Math.round(samplesData.final_price);

	const [ activeDiscount, setActiveDiscount ] = useState<any>(false);

	const onChange = (e: any, setState: any) => {
		setState(e.currentTarget.value);
	}

	const discountString = 
		discount >= 0 ? 
		`${discount}% sobre o valor` :
		`${discount*-1}% de descontro`;

	return (
		<div className="property-prices-wrapper">
			<div className="property-prices">
				<div>valor médio</div>
				<div className="property-prices-number">
					R$ {siFormat(priceMean).replaceAll(",", ".")}
				</div>
			</div>
			<div className="property-prices">
				<div>valor de {businessTypeId === 1 ? "venda" : "locação"}</div>
				<div 
					className="property-prices-number"
					onMouseLeave={() => setActiveDiscount(false)} 
					style={{position: "relative"}} 
				>
					<div>R$ {siFormat(valorVenda).replaceAll(",", ".")}</div>
					<div onMouseOver={setActiveDiscount} className="percentage-symbol">%</div>
					{activeDiscount && 
						<Formula
							title={`valor de ${businessTypeId === 1 ? "venda" : "locação"}`}
							currentState={discount}
							setCurrentState={setDiscount}
							onChange={onChange}
							text={discountString}
						/>
					}
				</div>
			</div>
		</div>
	)
}