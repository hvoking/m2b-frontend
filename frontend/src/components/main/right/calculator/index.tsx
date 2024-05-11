// App imports
import { PropertyPrices } from './prices';
import './styles.scss';

export const Calculator = () => {    
  return (
    <div className="calculator-item-wrapper">
      <PropertyPrices/>
    </div>
  )
}

Calculator.displayName="Calculator";