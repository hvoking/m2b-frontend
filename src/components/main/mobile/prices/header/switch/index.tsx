// React imports
import { useState, useEffect } from 'react';

// App imports
import './styles.scss';

// Context imports
import { usePrices } from '../../../../context/filters/prices';
import { usePropertyType } from '../../../../context/filters/property';

export const Switch = ({ on, off }: any) => {
	const { setUnitPrice } = usePrices();
	const { businessTypeId } = usePropertyType();

	const [ active, setActive ] = useState(true);

	useEffect(() => {
		active ? setUnitPrice("unit_price") : setUnitPrice("price")
	}, [ active ])

	const onClick = () => setActive((prev: boolean) => !prev);

	return (
		<>
			{businessTypeId === 1 &&
				<label className="switch-price">
				  <input type="checkbox" onClick={onClick}/>
				  <span className="slider-price round"/>
				  <span 
				  	className="labels" 
				  	data-on={on}
				  	data-off={off} 
				  />
				</label>
			}
		</>
	)
}

Switch.displayName="Switch";