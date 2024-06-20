// App imports
import { PdfUnitPrice } from './unitPrice';
import './styles.scss';

// Context imports
import { useLinesApi } from '../../../context/api/imoveis/lines';
import { usePropertyType } from '../../../context/filters/property';

// Third-party imports
import * as d3 from 'd3';

export const PdfPrices = () => {
    const { linesData } = useLinesApi();
    const { businessTypeId } = usePropertyType();
    
    const siFormat = d3.format(",");

    const unitPriceFormat = (tickValue: any) => d3.format(".2s")(tickValue).replace('G', 'B');
    const yAxisTickFormat = (tickValue: any) => unitPriceFormat(tickValue);

    const priceMin = linesData && siFormat(linesData.min_line_price);
    const priceMean = linesData && siFormat(linesData.mean_line_price);
    const priceMax = linesData && siFormat(linesData.max_line_price);

    const unitPriceMin = linesData && yAxisTickFormat(linesData.min_line_unit_price);
    const unitPriceMean = linesData && yAxisTickFormat(linesData.mean_line_unit_price);
    const unitPriceMax = linesData && yAxisTickFormat(linesData.max_line_unit_price);

    return (
        <div className="pdf-prices">
            <div className="pdf-title">
                Valor sugerido (anúncio)
            </div>
            <div className="pdf-prices-wrapper">
                <div style={{color: "rgba(229, 37, 33, 1)"}}>
                    R$ {priceMin}
                </div>
                <div style={{color: "rgba(72, 174, 77, 1)"}}>
                    R$ {priceMean}
                </div>
                <div style={{color: "rgba(166, 164, 210, 1)"}}>
                    R$ {priceMax}
                </div>
            </div>
            {businessTypeId === 1 && <PdfUnitPrice
                unitPriceMin={unitPriceMin}
                unitPriceMean={unitPriceMean}
                unitPriceMax={unitPriceMax}
            />}
        </div>
    )
}