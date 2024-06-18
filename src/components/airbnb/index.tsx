// App imports
import { Wrapper } from './wrapper';
import { Left } from './left';
import { Right } from './right';
import { Mobile } from './mobile';
import { Maps } from './maps';
import './styles.scss';

export const Airbnb = () => {
	return (
		<Wrapper>
			<div className="airbnb-wrapper">
				<Right/>
				<div style={{display: "grid", gridTemplateRows: "8fr 3fr", height: "calc(100vh - 70px)"}}>
					<Maps/>
					<Left/>
				</div>
				<Mobile/>
			</div>
		</Wrapper>
	)
}

Airbnb.displayName="Airbnb";