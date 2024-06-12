// App imports
import './styles.scss';

export const PropertyImages = ({ currentImage }: any) => {
	const onError = (e: any) => {
		e.target.src = "static/components/maps/hover/on_error.webp";
	}

	// const decrement = () => {
	// 	if(currentImage <= 0) {
	// 		return;
	// 	}
	// 	setCurrentImage(currentImage - 1);
	// }

	// const increment = () => {
	// 	if (currentImage === imagesLength - 1) {
	// 		return;
	// 	}
	// 	setCurrentImage(currentImage + 1);
	// }

	return (
		<div className="airbnb-pictures-body">
			{/*<div className="arrow-left" onClick={decrement}/>*/}
			<div className="pictures-item-wrapper">
				<img 
					className="pictures-item"
					src={currentImage}
					alt="property_image"
					onError={onError}
				/>
			</div>
			{/*<div className="arrow-right" onClick={increment}/>*/}
		</div>
	)
}

PropertyImages.displayName="PropertyImages";