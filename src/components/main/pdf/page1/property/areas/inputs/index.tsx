// App imports
import { AreaItem } from './item';

// Context imports
import { useAreas } from '../../../../../context/filters/areas';

export const AreaInputs = () => {
	const { areaMin, setAreaMin, areaMax, setAreaMax, setLeftPosition, setRightPosition } = useAreas();

	const onChangeMin = (e: any) => {
		const currentValue = e.target.value;
		if (currentValue <= 270) {
			setAreaMin(currentValue);
			setLeftPosition(currentValue);
		}
	}

	const onChangeMax = (e: any) => {
		const currentValue = e.target.value;
		if (currentValue >= 0 && currentValue <= 270) {
			setAreaMax(currentValue);
			setRightPosition(currentValue);
		}
	}

	return (
		<div className="sidebar-title-wrapper">
			<AreaItem
				title={"de:"}
				value={Math.round(areaMin)}
				onChange={onChangeMin}
			/>
			<AreaItem
				title={"até:"}
				value={Math.round(areaMax)}
				onChange={onChangeMax}
			/>
		</div>
	)
}

AreaInputs.displayName="AreaInputs";