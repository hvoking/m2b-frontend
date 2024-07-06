// App Imports
import { Info } from './info';
import { Title } from './title';
import { Graphics } from './graphics';

export const Bottom = () => {
	return (
		<div className="page1-bottom">
			<Info/>
			<Title/>
			<Graphics/>
		</div>
	)
}

Bottom.displayName="Bottom";