// App imports
import './styles.scss';

export const PropertyImages = ({ currentImage }: any) => {
	const onError = (e: any) => {
		e.target.src = "static/components/maps/hover/on_error.webp";
	}

	return (
		<div className="airbnb-pictures-body">
			<div className="pictures-item-wrapper">
				<img 
					className="pictures-item"
					src={currentImage}
					alt="property_image"
					onError={onError}
				/>
			</div>
		</div>
	)
}

PropertyImages.displayName="PropertyImages";