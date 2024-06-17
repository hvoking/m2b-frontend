// App imports
import { Wrapper } from './wrapper';
import { Left } from './left';
import { Right } from './right';
import { Mobile } from './mobile';
import { Maps } from './maps';
import { UserPdf } from './pdf';
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
			<UserPdf/>
		</Wrapper>
	)
}

Airbnb.displayName="Airbnb";