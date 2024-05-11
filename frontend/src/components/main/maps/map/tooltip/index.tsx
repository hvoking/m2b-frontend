// App imports
import { Price } from './price';
import { Symbols } from './symbols';
import './styles.scss';

// Context imports
import { useTooltip } from '../../../context/maps/tooltip';
import { usePrices } from '../../../context/filters/prices';

export const Tooltip = () => {
	const { propertyHoverInfo } = useTooltip(); 
	const { unitPrice } = usePrices();
	
	if (!propertyHoverInfo || !propertyHoverInfo.object) return <></>

	// Sort variables
	let image_src = propertyHoverInfo.object.image_src;

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
				src={iscUrl + image_src[0]}
				alt="property"
			/>
		</div>
	)
}

Tooltip.displayName="Tooltip";