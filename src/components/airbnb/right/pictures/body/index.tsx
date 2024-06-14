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

	return (
		<div className="airbnb-description-wrapper">
			<div style={{display: "grid", gridTemplateRows: "auto 18px"}}>
				<div className="airbnb-description">
					<div>{item.name}</div>
					<div>{item.property_type}</div>
					<div>{item.accommodates} {item.accommodates === 1 ? "guest" : "guests"}</div>
					<div>{siFormat(item.price).replaceAll(",", ".")} £ night</div>
					
				</div>
				<a 
					href={item.listing_url}
					style={{fontSize: "1em", color: "rgba(255, 255, 255, 0.8)"}}
					target="_blank"
					rel="noopener noreferrer"
				>
					View on Airbnb
				</a>
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