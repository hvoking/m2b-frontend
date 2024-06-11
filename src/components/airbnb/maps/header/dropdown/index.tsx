// App imports
import { IsoDropdown } from './iso';
import { FiltersDropdown } from './type';
import './styles.scss';

// Context imports
import { useIsoPolygonApi } from '../../../context/api/isoPolygon';

export const Dropdown = () => {
	const { routingProfile, setRoutingProfile, contoursMinutes, setContoursMinutes } = useIsoPolygonApi();

	const transportListOfValues: any = {
		"walking": "static/components/maps/header/walking-active.svg",
		"cycling": "static/components/maps/header/cycling-active.svg",
		"driving": "static/components/maps/header/driving-active.svg"
	}

	const minutesDict: any = {
		"5": "5 min",
		"10": "10 min",
		"15": "15 min",
		"30": "30 min",
		"60": "60 min",
	}

	return (
		<div className="map-header">
			<IsoDropdown
				listOfValues = {transportListOfValues}
				currentState={routingProfile}
				setState={setRoutingProfile}
			/>
			<FiltersDropdown
				imoveisDict={minutesDict}
				propertyName={`${contoursMinutes} min`}
				setPropertyTypeId={setContoursMinutes}
			/>
		</div>
	)
}

Dropdown.displayName="Dropdown";