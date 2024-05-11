// App imports
import './styles.scss';

export const PropertyImages = ({ propertyInfo, imagesLength, currentImage, setCurrentImage }: any) => {
	let image_src = propertyInfo.image_src;

	const onError = (e: any) => {
		e.target.src = "static/components/maps/hover/on_error.webp";
	}

	const decrement = () => {
		if(currentImage <= 0) {
			return;
		}
		setCurrentImage(currentImage - 1);
	}

	const increment = () => {
		if (currentImage === imagesLength - 1) {
			return;
		}
		setCurrentImage(currentImage + 1);
	}

	const iscUrl = "https://media.imoveis-sc.com.br/media/pad-760-580-000/";

	return (
		<div className="pictures-body">
			<div className="arrow-left" onClick={decrement}/>
			<div className="pictures-item-wrapper">
				<img 
					className="pictures-item"
					src={iscUrl + image_src[currentImage]}
					alt="property_image"
					onError={onError}
				/>
				<div>
					{currentImage + 1} - {imagesLength}
				</div>
			</div>
			<div className="arrow-right" onClick={increment}/>
		</div>
	)
}

PropertyImages.displayName="PropertyImages";