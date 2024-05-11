// App imports
import './styles.scss';

export const Formula = ({ title, currentState, setCurrentState, onChange, text }: any) => {
	const onChangeMin = (e: any) => {
		const currentValue = currentState - 1;
		currentValue < 101 && currentValue > - 101 && setCurrentState(currentValue);
	}
	const onChangeMax = (e: any) => {
		const currentValue = currentState + 1;
		currentValue < 101 && currentValue > - 101 && setCurrentState(currentValue);
	}

	return (
		<div className="formula-wrapper-wrapper">
		<div className="formula-wrapper">
			<div style={{fontWeight: "600", letterSpacing: "1px"}}>{title}</div>
			<div className="formula-bottom-wrapper">
				<div className="formula-item-wrapper">
					<div 
						className="formula-minus-sign" 
						onClick={onChangeMin}
					>
						-
					</div>
					<input 
						type="text" 
						className="formula-number" 
						value={currentState}
						onChange={(e: any) => onChange(e, setCurrentState)}
					/>
					<div 
						className="formula-plus-sign" 
						onClick={onChangeMax}
					>
						+
					</div>
				</div>
				<div style={{textAlign: "left"}}>{text}</div>
			</div>
		</div>
		</div>
	)
}