// App imports
import './styles.scss';

// Context imports
import { useAreas } from '../../../context/filters/areas';

export const Numbers = () => {	
	const { leftPosition, setLeftPosition, rightPosition, setRightPosition, setAreaMin, setAreaMax } = useAreas();

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
		<div className="areas-number-wrapper">
			<div>
				<input 
					className="areas-input" 
					value={leftPosition && parseInt(leftPosition)} 
					onChange={onChangeMin}
				/>
				<div>mínima</div>
			</div>
			<div>
				<input 
					className="areas-input" 
					value={rightPosition && parseInt(rightPosition)} 
					onChange={onChangeMax}
				/>
				<div>máxima</div>
			</div>
		</div>
	)
}

Numbers.displayName="Numbers";