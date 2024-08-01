// App imports
import './styles.scss';

// Context imports
import { usePrices } from '../../../context/filters/prices';
import { useLinesLimits } from '../../../context/limits/lines';
import { usePropertyType } from '../../../context/filters/property';
import { useTooltip } from '../../../context/maps/tooltip';

// Third-party imports
import { Marker } from 'react-map-gl';
import * as d3 from 'd3';

const siFormat = (tickValue: any) => d3.format(".2s")(tickValue).replace('G', 'B');
const priceFormat = (tickValue: any) => siFormat(tickValue).replace('G', 'B');

export const CustomMarker = ({ filterProperties }: any) => {
  const { unitPrice } = usePrices();
  const { bottomLimit, topLimit } = useLinesLimits();
  const { businessTypeId, currentPropertyId, setCurrentPropertyId } = usePropertyType();
  const { setPropertyHoverInfo, setPropertyInfo, setActivePropertyInfo } = useTooltip();

  const currentPriceString = 
    unitPrice === "price" ? 
    "price" : 
    "unit_price";

  const onClick = (info: any) => {
    setActivePropertyInfo(true);
    setPropertyInfo(info);
  };

  const onMouseEnter = (info: any) => {
    setCurrentPropertyId(info.property_id);
    setPropertyHoverInfo(info);
    
  };

  const onMouseLeave = () => {
    setCurrentPropertyId(null);  
    setPropertyHoverInfo(null);
  };

  return (
    <>
      {
        filterProperties?.map((marker: any, index: number) => {
          const coordinates = marker.geometry.coordinates;

          const longitude = coordinates[0];
          const latitude = coordinates[1];

          return (
            <Marker key={index} longitude={longitude} latitude={latitude} >
                <div 
                  className="marker-content" 
                  onClick={() => onClick(marker)}
                  onMouseOver={() => onMouseEnter(marker)}
                  onMouseLeave={onMouseLeave}
                  style={{
                    backgroundColor: 
                        currentPropertyId && currentPropertyId === marker.property_id ?
                        "rgba(255, 255, 0, 255)" :
                        marker[currentPriceString] > topLimit ?
                        "rgba(166, 166, 244, 120)" :
                        marker[currentPriceString] < bottomLimit ?
                        "rgba(255, 0, 0, 120)" :
                        "rgba(57, 181, 74, 120)"
                  }}
                >
                  {priceFormat(marker[currentPriceString])}
                </div>
            </Marker>
        )})
      }
    </>
  );
}

CustomMarker.displayName="CustomMarker";