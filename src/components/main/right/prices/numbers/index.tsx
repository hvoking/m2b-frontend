// App imports
import './styles.scss';

export const Numbers = ({ leftPosition, rightPosition, setPriceMin, setPriceMax }: any) => {
	const onChangeMin = (e: any) => {
		const currentValue = e.target.value;
		if (currentValue >= 0 && currentValue < rightPosition) {
			setPriceMin(currentValue)
		}
	}

	const onChangeMax = (e: any) => {
		const currentValue = e.target.value;
		setPriceMax(currentValue)
	}

	return (
		<div className="price-number-wrapper">
			<div 
				className="price-input" 
				onChange={onChangeMin}
			>
				{leftPosition}
			</div>
			<div 
				className="price-input" 
				onChange={onChangeMax}
			>
				{rightPosition}
			</div>
		</div>
	)
}

Numbers.displayName="Numbers";