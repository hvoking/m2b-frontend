// React imports
import { useState } from 'react';

// App imports
import { ImagesHeader } from './header';
import { ImagesFooter } from './footer';
import { PropertyImages } from './body';
import './styles.scss';

// Context imports
import { useTooltip } from '../../context/maps/tooltip';

export const Pictures = () => {
	const [ currentImage, setCurrentImage ] = useState(0);
	const { propertyInfo, activePropertyInfo, setActivePropertyInfo } = useTooltip();
	
	if (!propertyInfo) return <></>

	const imagesLength = propertyInfo.image_src.length;

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