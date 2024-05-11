// App imports
import { Left } from './left';
import { Middle } from './middle';
import { Right } from './right';
import './styles.scss';

export const Page2 = () => {
	return (
		<div className="page2-wrapper">
			<Left/>
			<Middle/>
			<Right/>
		</div>
	)
}

Page2.displayName="Page2";