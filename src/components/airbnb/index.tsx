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
				<div style={{display: "grid", gridTemplateRows: "8fr 3fr", height: "calc(100vh - 70px)"}}>
					<Maps/>
					<Graphics/>
				</div>
			</div>
		</Wrapper>
	)
}

Airbnb.displayName="Airbnb";