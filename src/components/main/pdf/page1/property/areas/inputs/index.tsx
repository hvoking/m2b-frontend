// App imports
import { AreaItem } from './item';

// Context imports
import { useAreas } from '../../../../../context/filters/areas';

export const AreaInputs = () => {
	const { areaMin, areaMax } = useAreas();

	return (
		<div className="sidebar-title-wrapper">
			<AreaItem
				title={"de:"}
				value={Math.round(areaMin)}
			/>
			<AreaItem
				title={"até:"}
				value={Math.round(areaMax)}
			/>
		</div>
	)
}

AreaInputs.displayName="AreaInputs";