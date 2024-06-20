// App imports
import { priceFormat } from '../../utils/constants';
import { Header } from './header';
import './styles.scss';

// Context imports
import { useLinesLimits } from '../../context/limits/lines';

// Third party imports
import * as d3 from 'd3';

export const Calculator = () => {    
  const { bottomLimit, topLimit, minLine, meanLine, maxLine } = useLinesLimits();

  return (
    <div className="calculator-wrapper">
    <Header/>
    <div className="calculator-item-wrapper">
      <div>
        <div
          className="calculator-item"
          style={{
            backgroundColor: "rgba(68, 27, 30, 1)", 
            border: "1px solid rgba(255, 0, 0, 1)",
          }}
        >
          {priceFormat(minLine)}
        </div>
        <div className="calculator-text">Mínimo</div>
      </div>
      <div>
        <div
          className="calculator-item"
          style={{
            backgroundColor: "rgba(21, 59, 39, 1)", 
            border: "1px solid rgba(57, 181, 74, 1)",
          }}
        >
          {priceFormat(meanLine)}
        </div>
        <div className="calculator-text">Sugerido</div>
      </div>
      <div>
        <div
          className="calculator-item"
          style={{
            backgroundColor: "rgba(42, 43, 96, 1)", 
            border: "1px solid rgba(166, 166, 244, 1)", 
          }}
        >
          {priceFormat(maxLine)}
        </div>
        <div className="calculator-text">Máximo</div>
      </div>
    </div>
    </div>
  )
}

Calculator.displayName="Calculator";