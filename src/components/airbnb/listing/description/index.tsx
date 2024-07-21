// Context imports
import { useLinesLimits } from '../../context';

export const Description = ({ item }: any) => {
	const { bottomLimit, topLimit } = useLinesLimits();
	return (
		<div 
			className="listing-content" 
			style={{
				backgroundColor: 
					item['price'] < bottomLimit ? 
					"rgba(68, 27, 30, 1)" :
					item['price'] > topLimit ? 
					"rgba(42, 43, 96, 1)" :
					"rgba(21, 59, 39, 1)"
			}}
		>
			<div className="title-wrapper">
				<div className="listing-title">{item.name}</div>
		    	<div className="listing-rating">
		            ★ {item.review_scores_rating} ({item.number_of_reviews})
		        </div>
		    </div>
		    <div className="listing-info">{item.accommodates} guests | {item.property_type}</div>
		    <div 
		    	className="listing-price" 
		    	style={{
		    		color: 
						item['price'] < bottomLimit ? 
						"rgba(255, 0, 0, 1)" :
						item['price'] > topLimit ? 
						"rgba(166, 166, 244, 1)" :
						"rgba(67, 181, 64, 1)"
		    	}}
		    >
		    	{item.price} € night
		    </div>
		</div>
	)
}

Description.displayName="Description";