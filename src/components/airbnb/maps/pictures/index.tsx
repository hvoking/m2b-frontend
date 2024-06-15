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
	const { propertyInfo, activePropertyInfo, setActivePropertyInfo } = useTooltip();

	if (!propertyInfo) return <></>

	return (
		<>
			{activePropertyInfo && <div className="pictures-wrapper">
				<div></div>
					<div className="ads-pictures-wrapper">
						<ImagesHeader 
							propertyInfo={propertyInfo} 
							setActivePropertyInfo={setActivePropertyInfo} 
						/>
						<PropertyImages currentImage={propertyInfo.image_src}/>
						<ImagesFooter 
							propertyInfo={propertyInfo}
						/>
					</div>
				<div></div>
			</div>}
		</>
	)
}

Pictures.displayName="Pictures";