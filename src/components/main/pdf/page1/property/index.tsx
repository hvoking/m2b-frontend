// App imports
import { Areas } from './areas';
import { Rooms } from './rooms';
import { Address } from './address';
import { Dropdown } from './dropdown';
import './styles.scss';

// Context imports
import { usePropertyType } from '../../../context/filters/property';

export const Property = () => {
	const { propertyName, setPropertyTypeId, propertyDict, businessName, setBusinessTypeId, businessDict } = usePropertyType();

	return (
		<div className="property-parameters">
			<Address/>
			<div className="property-parameter">
				<div>Tipologia</div>
				<Dropdown
					imoveisDict={propertyDict}
					propertyName={propertyName}
					setPropertyTypeId={setPropertyTypeId}
				/>
			</div>
			<div className="property-parameter">
				<div>Tipo de Negócio</div>
				<Dropdown
					imoveisDict = {businessDict}
					propertyName={businessName}
					setPropertyTypeId={setBusinessTypeId}
				/>
			</div>
			<Areas/>
			<Rooms/>
		</div>
	)
}

Property.displayName="Property";