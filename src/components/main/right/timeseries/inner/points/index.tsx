// Context imports
import { usePrices } from '../../../../context/filters/prices';
import { useTooltip } from '../../../../context/maps/tooltip';
import { useLinesLimits } from '../../../../context/limits/lines';
import { usePricesLimits } from '../../../../context/limits/prices';

export const Points = ({ xScale, yScale }: any) => {
    const { filterPrices, filterByEquipment } = usePricesLimits();
    const { unitPrice } = usePrices();
    const { propertyHoverInfo } = useTooltip();
    const { bottomLimit, topLimit } = useLinesLimits();

    const currentPriceString = 
        unitPrice === "price" ? 
        "price" : 
        "unit_price";

    const currentPropertyId = propertyHoverInfo && propertyHoverInfo.object && propertyHoverInfo.object.property_id;
    
    return (
        <>
            
            {filterByEquipment.map((item: any, i: number) => {
                return (
                    <circle 
                        key={i}
                        cx={xScale(Date.parse(item.start_date))} 
                        cy={yScale(item[currentPriceString])}
                        r={
                            currentPropertyId === item.property_id ? 5 : 
                            1.2
                        }
                        fill={
                            currentPropertyId === item.property_id ? 
                            "rgba(222, 222, 0, 0.2)" :
                            item[currentPriceString] > topLimit ?
                            "rgba(166, 166, 244, 0.2)" :
                            item[currentPriceString] < bottomLimit?
                            "rgba(255, 0, 0, 0.2)" : 
                            "rgba(57, 181, 74, 0.2)"
                        }
                        stroke={"none"}
                    />
                )
            }

        )}
        {filterPrices.map((item: any, i: number) => {
            return (
                <circle 
                    key={i}
                    cx={xScale(Date.parse(item.start_date))} 
                    cy={yScale(item[currentPriceString])}
                    r={
                        currentPropertyId === item.property_id ? 5 : 
                        1.6
                    }
                    fill={
                        currentPropertyId === item.property_id ? 
                        "rgba(222, 222, 0, 1)" :
                        item[currentPriceString] > topLimit ?
                        "rgba(166, 166, 244, 1)" :
                        item[currentPriceString] < bottomLimit?
                        "rgba(255, 0, 0, 1)" : 
                        "rgba(57, 181, 74, 1)"
                    }
                    stroke={"none"}
                />
            )
        }

    )}
        </>
    
)}
