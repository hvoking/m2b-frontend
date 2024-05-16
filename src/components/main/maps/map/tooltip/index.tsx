// App imports
import { Price } from './price';
import { Symbols } from './symbols';
import './styles.scss';

// Context imports
import { useTooltip } from '../../../context/maps/tooltip';
import { usePrices } from '../../../context/filters/prices';
import { useImagesApi } from '../../../context/api/imoveis/images';

export const Tooltip = () => {
	const { propertyHoverInfo } = useTooltip(); 
	const { unitPrice } = usePrices();
	const { imagesData } = useImagesApi();
	
	if (!propertyHoverInfo || !propertyHoverInfo.object || !imagesData) return <></>

	const iscUrl = "https://media.imoveis-sc.com.br/media/thumb-290-250/";

	return (
		<div 
			className="tooltip-wrapper" 
			style={{ left: propertyHoverInfo.x, top: propertyHoverInfo.y }}
		>
			<div className="tooltip-header">
				<Price unitPrice={unitPrice} propertyHoverInfo={propertyHoverInfo}/>
				<Symbols item={propertyHoverInfo.object}/>
			</div>
			<img 
				width={170}
				src={iscUrl + imagesData[0][0]}
				alt="property"
			/>
		</div>
	)
}

Tooltip.displayName="Tooltip";