// App imports
import { Subtitle } from './subtitle';
import { Description } from './description';
import { Title } from './title';

export const Left = () => {
	return (
		<div className="page1-left-wrapper">
			<Title/>
			<Subtitle/>
			<Description/>
		</div>
	)
}

Left.displayName="Left";