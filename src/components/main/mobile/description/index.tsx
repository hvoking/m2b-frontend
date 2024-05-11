// App imports
import { Subtitle } from './subtitle';

export const Description = () => {
	return (
		<div className="main-bottom">
			<div>
				<div className="pages-title">m²b</div>
				<div style={{fontStyle: "italic", textAlign: "center"}}>
					<div>metro</div>
					<div>quadrado</div>
					<div>de bolso</div>
				</div>
			</div>
			<Subtitle/>
		</div>
	)
}

Description.displayName="Description";