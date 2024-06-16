// App imports
import './styles.scss';

// Context imports
import { useSamplesApi } from '../../../context/api/imoveis/samples';

// Third-party imports
import * as d3 from 'd3';

export const Calculator = () => {
  const { samplesData } = useSamplesApi();

  const siFormat = d3.format(",");
  const priceMean = samplesData && Math.round(samplesData.mean_price);

  return (
    <div className="airbnb-calculator-item-wrapper">
      <div className="sidebar-sub-title">Price range</div>
      <div className="property-prices">
        <div>avg</div>
        <div className="airbnb-property-prices-number">
          {siFormat(priceMean).replaceAll(",", ".")} £ 
        </div>
      </div>
    </div>
  )
}

Calculator.displayName="Calculator";