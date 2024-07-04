// React imports
import { useState } from 'react';

// App imports
import './styles.scss'

export const Body = ({ item, setRejectedIds, currentImage, setCurrentPropertyId, setPropertyInfo, setActivePropertyInfo, textColor, backgroundColor }: any) => {
	const [ validImages, setValidImages ] = useState<any>({});

	const rejectId = (e: any, item: any) => {
		e.stopPropagation();
		const currentValue = item.property_id;
		setRejectedIds((prev: any) => [...prev, currentValue]);
	}

	const handleImageLoad = (id: any) => {
	    setValidImages((prev: any) => ({ ...prev, [id]: true }));
	  };

	const handleImageError = (id: any) => {
		setValidImages((prev: any) => ({ ...prev, [id]: false }));
	};

	const onMouseOver = (e: any, item: any) => {
		setCurrentPropertyId(item.property_id);
	}

	if (validImages[item.property_id] === false) return <></>

	return (
		<div className="airbnb-description-wrapper" onMouseOver={(e: any) => onMouseOver(e, item)}>
			 <div className="listing-container" style={{backgroundColor: backgroundColor}}>
			 	<div style={{position: "relative"}}>
			 		<img 
			 		 	src={currentImage}
			 		 	className="listing-thumbnail"
			 		 	alt="property"
			 		 	loading="lazy"
			 		 	onLoad={() => handleImageLoad(item.property_id)}
			 		 	onError={() => handleImageError(item.property_id)}
			 		 	onClick={() => {
			 		 		setPropertyInfo(item);
			 		 		setActivePropertyInfo(true);
			 		 	}}
			 		 />
			 		 <a 
	 					href={item.listing_url}
	 					className="airbnb-link"
	 					target="_blank"
	 					rel="noopener noreferrer"
	 				>
	 					View on Airbnb
	 				</a>
			 		 <img
 		 				className="airbnb-cancel-cross"
 		 				src="static/logos/cancel_search.svg" 
 		 				alt="cancel-icon"
 		 				onClick={(e: any) => rejectId(e, item)}
 		 			/>
			 	</div>
			    <div className="listing-content">
			    	<div className="title-wrapper">
			    		<div className="listing-title">{item.name}</div>
				    	<div className="listing-rating">
				            ★ {item.review_scores_rating} ({item.number_of_reviews})
				        </div>
				    </div>
			        <div className="listing-info">{item.accommodates} guests | {item.property_type}</div>
			        <div className="listing-price" style={{color: textColor}}>{item.price} € night</div>
			    </div>
			</div>
		</div>
	)
}

Body.displayName="Body";