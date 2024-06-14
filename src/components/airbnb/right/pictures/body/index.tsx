// Third-party imports
import * as d3 from 'd3';

// App imports
import './styles.scss';

const siFormat = d3.format(",");

export const Body = ({ item, setRejectedIds, setCurrentPropertyId }: any) => {
	const rejectId = (e: any, item: any) => {
		e.stopPropagation();
		const currentValue = item.property_id;
		setRejectedIds((prev: any) => [...prev, currentValue]);
	}
	
	const onMouseOver = (e: any, item: any) => {
		setCurrentPropertyId(item.property_id);
	}

	return (
		<div
			className="airbnb-description-wrapper"
			onMouseOver={(e: any) => onMouseOver(e, item)}
			onMouseOut={() => setCurrentPropertyId(null)}
		>
			<div className="airbnb-description">
				<div>{item.property_type}</div>
				<div>{siFormat(item.price).replaceAll(",", ".")} £ night</div>
				<div>{item.accommodates}</div>
			</div>
			<img
				className="pdf-cancel-cross"
				src="static/logos/cancel_search.svg" 
				alt="cancel-icon"
				onClick={(e: any) => rejectId(e, item)}
			/>
		</div>
	)
}

Body.displayName="Body";