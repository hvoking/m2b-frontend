// App imports
import { Symbols } from './symbols';
import './styles.scss';

// Third-party imports
import * as d3 from 'd3';

export const ImagesHeader = ({ propertyInfo, setActivePropertyInfo }: any) => {
	const siFormat = d3.format(",");
	
	const onClick = () => {
		setActivePropertyInfo(false);
	}
	
	return (
		<div className="pictures-header">
			<Symbols item={propertyInfo}/>
			<div>
				{propertyInfo.property_type}
			</div>
			<div></div>
			<div>{siFormat(Math.round(propertyInfo.price))} £</div>
			<img
				className="ads-cancel-search-cross"
				src="static/logos/cancel_search.svg" 
				alt="search-icon"
				onClick={onClick}
			/>
		</div>
	)
}

ImagesHeader.displayName="ImagesHeader";