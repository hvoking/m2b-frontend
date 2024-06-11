// App imports
import { Price } from './price';
import { Symbols } from './symbols';
import './styles.scss';

// Context imports
import { useTooltip } from '../../../context/maps/tooltip';

export const Tooltip = () => {
	const { propertyHoverInfo } = useTooltip(); 
	
	if (!propertyHoverInfo || !propertyHoverInfo.object) return <></>

	return (
		<div 
			className="tooltip-wrapper" 
			style={{ left: propertyHoverInfo.x, top: propertyHoverInfo.y }}
		>
			<div className="tooltip-header">
				<Price price={propertyHoverInfo.object.price} propertyHoverInfo={propertyHoverInfo}/>
				<Symbols item={propertyHoverInfo.object}/>
			</div>
			<img 
				width={170}
				src={propertyHoverInfo.object.image_src}
				alt="property"
			/>
		</div>
	)
}

Tooltip.displayName="Tooltip";