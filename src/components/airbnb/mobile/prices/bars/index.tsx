export const Bars = ({ 
    bottomLimit, topLimit,
    xScale, yScale, 
    pricesArray, pricesKeys, 
    innerWidth, innerHeight, priceFormat,
    leftPosition, rightPosition,
}: any) => {
    return (
        <g>
            {
                pricesArray.map((item: any, index: number) => {
                    const currentPriceMin = pricesKeys[index].split("-")[0];
                    const currentPriceMax = pricesKeys[index].split("-")[1];
                    return (
                        <rect
                            key={index}
                            x={xScale(index)}
                            y={innerHeight - yScale(item) - 20}
                            width={innerWidth / (pricesArray.length - 1) - 3}
                            height={yScale(item) + 20}
                            fill={
                                +currentPriceMin < bottomLimit && +currentPriceMax < leftPosition ?
                                "rgba(255, 0, 0, 0.6)" :
                                +currentPriceMin < bottomLimit && +currentPriceMin > rightPosition ?
                                "rgba(255, 0, 0, 0.6)" :
                                +currentPriceMin < bottomLimit ?
                                "rgba(255, 0, 0, 1)" :
                                +currentPriceMax > topLimit && +currentPriceMin > rightPosition ?
                                "rgba(166, 166, 244, 0.6)" :
                                +currentPriceMax > topLimit && +currentPriceMax < leftPosition ?
                                "rgba(166, 166, 244, 0.6)" :
                                +currentPriceMax > topLimit ?
                                "rgba(166, 166, 244, 1)" :
                                +currentPriceMin > rightPosition || +currentPriceMax < leftPosition ?
                                "rgba(57, 181, 74, 0.6)" :
                                "rgba(57, 181, 74, 1)"
                            }
                        />
                    )
                })
            }
            
        </g>
    )
}

Bars.displayName="Bars"