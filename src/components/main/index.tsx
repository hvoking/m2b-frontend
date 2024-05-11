// App imports
import { Wrapper } from './wrapper';
import { Left } from './left';
import { Right } from './right';
import { Mobile } from './mobile';
import { Maps } from './maps';
import { UserPdf } from './pdf';
import './styles.scss';

export const Main = () => {
	return (
		<Wrapper>
			<div className="main">
				<Left/>
				<Maps/>
				<Right/>
				<Mobile/>
			</div>
			<UserPdf/>
		</Wrapper>
	)
}

Main.displayName="Main";