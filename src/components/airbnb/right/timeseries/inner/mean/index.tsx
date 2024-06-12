// App imports
import './styles.scss';

// Context imports
import { useMeanApi } from '../../../../context/api/imoveis/mean';

// Third party imports
import * as d3 from 'd3';

export const Mean = ({ yScale, innerWidth }: any) => {
    const { meanData } = useMeanApi();

    if (!meanData || !meanData.price_avg) return <></>

    const priceAvg = meanData.price_avg;

    const dataMin: any = d3.min(Object.keys(priceAvg));
    const dataMax: any = d3.max(Object.keys(priceAvg));

    const xScale = d3.scaleTime()
      .domain([Date.parse(dataMin), Date.parse(dataMax)])
      .range([0, innerWidth]);

    const filteredPriceAvg = Object.fromEntries(
        Object.entries(priceAvg).filter(([key, value]: any) => value !== null)
    );


    const entries: any = Object.entries(filteredPriceAvg)

    const values = entries.map(([date, value]: any) => value);

    // Function to calculate the quartiles and IQR
    function calculateIQR(values: any) {
        const sortedValues = values.slice().sort((a: any, b: any) => a - b);
        const q1 = sortedValues[Math.floor((sortedValues.length / 4))];
        const q3 = sortedValues[Math.floor((sortedValues.length * (3 / 4)))];
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;
        return { lowerBound, upperBound };
    }

    // Calculate the IQR and bounds
    const { lowerBound, upperBound } = calculateIQR(values);

    // Filter out the outliers
    const filteredData = entries.filter(([date, value]: any) => value >= lowerBound && value <= upperBound);


    return (
        <g>
            <path
                className="line-background" 
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth={1.2}
                d={
                    `${
                        d3.line()
                            .x((d: any) => xScale(Date.parse(d[0])))
                            .y((d: any) => yScale(d[1]))
                            .curve(d3.curveNatural)(filteredData)
                    }`
                } 
            />
            <circle
                cx={xScale(Date.parse(dataMin))} 
                cy={yScale(priceAvg[dataMin])}
                r={3.6}
                fill={"rgba(255, 255, 255, 0.6)"}
            />
            <circle
                cx={xScale(Date.parse(dataMax))} 
                cy={yScale(priceAvg[dataMax])}
                r={3.6}
                fill={"rgba(255, 255, 255, 0.6)"}
            />
        </g>
    )
}

Mean.displayName="Mean"