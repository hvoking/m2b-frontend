// App imports
import { Price } from './price';
import { Symbols } from './symbols';
import './styles.scss';

// Context imports
import { useTooltip } from '../../../context/maps/tooltip';
import { usePrices } from '../../../context/filters/prices';
import { useImagesApi } from '../../../context/api/imoveis/images';

// Third-party imports
import { Marker } from 'react-map-gl';

export const Tooltip = () => {
	const { propertyHoverInfo } = useTooltip(); 
	const { unitPrice } = usePrices();
	const { imagesData } = useImagesApi();
	
	if (!propertyHoverInfo || !imagesData) return <></>

	const iscUrl = "https://media.imoveis-sc.com.br/media/thumb-290-250/";
	const coordinates = propertyHoverInfo.geometry.coordinates;

	return (
		<Marker longitude={coordinates[0]} latitude={coordinates[1]} >
			<div className="tooltip-wrapper" >
				<div className="tooltip-header">
					<Price unitPrice={unitPrice} propertyHoverInfo={propertyHoverInfo}/>
					<Symbols item={propertyHoverInfo}/>
				</div>
				<img 
					width={170}
					src={iscUrl + imagesData[0][0]}
					alt="property"
				/>
			</div>
		</Marker>
	)
}

Tooltip.displayName="Tooltip";