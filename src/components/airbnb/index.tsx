// App imports
import { Wrapper } from './wrapper';
import { Graphics } from './graphics';
import { Listing } from './listing';
import { Maps } from './maps';
import './styles.scss';

export const Airbnb = () => {
	return (
		<Wrapper>
			<div className="airbnb-wrapper">
				<Listing/>
				<Maps/>
				<Graphics/>
			</div>
		</Wrapper>
	)
}

Airbnb.displayName="Airbnb";