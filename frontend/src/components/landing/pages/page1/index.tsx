// React imports
import { useState } from 'react';

// App imports
import { Left } from './left';
import { Right } from './right';

export const Page1 = () => {
	const [ activeMobile, setActiveMobile ] = useState(false);

	window.addEventListener('resize', () => {
	  let innerWidth = window.innerWidth;
	  innerWidth > 1000 ? setActiveMobile(false) : setActiveMobile(true)
	});
	
	return (
		<div 
			className="page-wrapper" 
			style={{
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundImage: 
					activeMobile || window.innerWidth < 1000 ?
					'url("static/components/landing/page1/landing_mobile_background.png")' :
					'url("static/components/landing/page1/landing_background.png")'
			}}
		>
			<Left/>
			<Right/>
		</div>
	)
}

Page1.displayName="Page1";