// Context imports
import { useTooltip } from '../../context';

export const Pictures = ({ item, setValidImages, setRejectedIds }: any) => {
	const currentImage = item.image_src && item.image_src;

	const { setPropertyInfo, setActivePropertyInfo } = useTooltip();

	const handleImageLoad = (id: any) => {
		setValidImages((prev: any) => ({ ...prev, [id]: true }));
	};

	const handleImageError = (id: any) => {
		setValidImages((prev: any) => ({ ...prev, [id]: false }));
	};

	const rejectId = (e: any, item: any) => {
		e.stopPropagation();
		const currentValue = item.property_id;
		setRejectedIds((prev: any) => [...prev, currentValue]);
	}

	return (
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
	)
}

Pictures.displayName="Pictures";