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
				<Left/>
				<Maps/>
				<Right/>
				<Mobile/>
			</div>
			<UserPdf/>
		</Wrapper>
	)
}

Airbnb.displayName="Airbnb";