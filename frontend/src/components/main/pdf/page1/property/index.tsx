// App imports
import { Areas } from './areas';
import { Rooms } from './rooms';
import { Address } from './address';
import './styles.scss';

// Context imports
import { usePropertyType } from '../../../context/filters/property';

export const PdfProperty = () => {
	const { propertyName, businessName } = usePropertyType();

	return (
		<div className="property-parameters">
			<Address/>
			<div className="property-parameter">
				<div>Imóvel</div>
				<div>{propertyName}</div>
			</div>
			<div className="property-parameter">
				<div>Negócio</div>
				<div>{businessName}</div>
			</div>
			<Areas/>
			<Rooms/>
		</div>
	)
}

PdfProperty.displayName="PdfProperty";