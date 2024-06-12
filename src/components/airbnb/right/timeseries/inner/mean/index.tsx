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

    const entries: any = Object.entries(priceAvg)

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
                            .curve(d3.curveNatural)(entries)
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