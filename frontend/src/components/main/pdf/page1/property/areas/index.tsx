// App imports
import { AreaInputs } from './inputs';

export const Areas = () => {
	return (
		<div className="property-parameter">
			<div>Área útil (m²)</div>
			<AreaInputs/>
		</div>
	)
}

Areas.displayName="Areas";