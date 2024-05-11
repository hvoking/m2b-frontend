// App imports
import { Symbols } from './symbols';

// Third-party imports
import * as d3 from 'd3';

const siFormat = d3.format(",");

export const Description = ({ item, setRejectedIds, setCurrentPropertyId }: any) => {
	const addId = (e: any, item: any) => {
		e.stopPropagation();
		const currentValue = item.property_id;
		setRejectedIds((prev: any) => [...prev, currentValue]);
	}
	
	const onMouseOver = (e: any, item: any) => {
		setCurrentPropertyId(item.property_id);
	}

	return (
		<div
			className="pdf-pictures-description-wrapper"
			onMouseOver={(e: any) => onMouseOver(e, item)}
			onMouseOut={() => setCurrentPropertyId(null)}
		>
			<div className="pdf-pictures-description">
				<div>R$ {siFormat(Math.round(item.price))}</div>
				<div>{item.processed_area} m²</div>
				<Symbols item={item}/>
			</div>
			<img
				className="pdf-cancel-cross"
				src="static/logos/cancel_search.svg" 
				alt="search-icon"
				onClick={(e: any) => addId(e, item)}
			/>
		</div>
	)
}

Description.displayName="Description";