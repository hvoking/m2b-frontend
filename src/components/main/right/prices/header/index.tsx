// App imports
import { priceFormat } from '../../../utils/constants';

// Context imports
import { useSamplesApi } from '../../../context/api/imoveis/samples';

// Third-party imports
import * as d3 from 'd3';

export const Header = () => {
  const { samplesData } = useSamplesApi();

  return (
    <div className="sidebar-header">
      <div className="sidebar-sub-title">Faixas de valores</div>
      <div></div>
      <div style={{display: "flex", gap: "5px", paddingTop: '5px', alignItems: "center"}}>
        <div style={{color: "rgba(255, 255, 255, 0.6)"}}>Méd.</div>
        <div className="airbnb-property-prices-number">
          {samplesData && samplesData.mean_price && priceFormat(samplesData.mean_price)}
        </div>
      </div>
    </div>
  )
}