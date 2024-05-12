// React imports
import { useState } from 'react';

// App imports
import { ImagesHeader } from './header';
import { ImagesFooter } from './footer';
import { PropertyImages } from './body';
import './styles.scss';

// Context imports
import { useTooltip } from '../../context/maps/tooltip';
import { useImagesApi } from '../../context/api/imoveis/images';

export const Pictures = () => {
	const [ currentImage, setCurrentImage ] = useState(0);
	const { propertyInfo, activePropertyInfo, setActivePropertyInfo } = useTooltip();
	const { imagesData } = useImagesApi();
	
	if (!propertyInfo || !imagesData) return <></>

	const imagesArray = imagesData[0].image_src;
	const imagesLength = imagesArray.length;

	return (
		<>
			{activePropertyInfo && <div className="pictures-wrapper">
				<div></div>
					<div className="ads-pictures-wrapper">
						<ImagesHeader 
							propertyInfo={propertyInfo} 
							setActivePropertyInfo={setActivePropertyInfo} 
							setCurrentImage={setCurrentImage}
						/>
						<PropertyImages 
							propertyInfo={propertyInfo}
							imagesArray={imagesArray}
							currentImage={currentImage} 
							setCurrentImage={setCurrentImage}
							imagesLength={imagesLength}
						/>
						<ImagesFooter 
							propertyInfo={propertyInfo}
							imagesLength={imagesLength} 
						/>
					</div>
				<div></div>
			</div>}
		</>
	)
}

Pictures.displayName="Pictures";