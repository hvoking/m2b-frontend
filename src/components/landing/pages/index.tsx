// App imports
import { Page1 } from './page1';
import { Page2 } from './page2'; 
import { Page3 } from './page3'; 
import { Page4 } from './page4'; 
import { Page5 } from './page5'; 
import { Social } from '../social';
import { Footer } from '../footer';
import './styles.scss';

export const Pages = () => {
	return (
		<div className="pages-wrapper">
			<Page1/>
			<Page2/>
			<Page3/>
			<Page4/>
			<Page5/>
			<Social/>
			<Footer/>
		</div>
	)
}

Pages.displayName="Pages";