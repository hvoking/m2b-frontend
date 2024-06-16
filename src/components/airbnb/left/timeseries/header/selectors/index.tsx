// React imports
import { useState } from 'react';

// App imports
import { Selector } from './selector';

// Context imports
import { usePropertyType } from '../../../../context/filters/property';

// App imports
import './styles.scss';

export const Selectors = () => {
        const [ currentTooltip, setCurrentTooltip ] = useState<any>(null);
        const { activeEquipment, setActiveEquipment } = usePropertyType();

        const imagePath = "static/components/timeseries/header/";

        return (
                <div className="right-selector-wrapper">
                        <Selector
                                activeEquipment={activeEquipment} 
                                setActiveEquipment={setActiveEquipment} 
                                currentTooltip={currentTooltip} 
                                setCurrentTooltip={setCurrentTooltip}
                                selectorText="wifi"
                                image={ imagePath + "wifi.png"}
                                imageActive={ imagePath + "wifiActive.png"}
                                tooltipText="Wifi"
                        />
                        <Selector
                                activeEquipment={activeEquipment} 
                                setActiveEquipment={setActiveEquipment} 
                                currentTooltip={currentTooltip} 
                                setCurrentTooltip={setCurrentTooltip}
                                selectorText="coffee"
                                image={imagePath + "coffee.png"}
                                imageActive={imagePath + "coffeeActive.png"}
                                tooltipText="coffee maker"
                        />
                </div>
        )
}

Selectors.displayName="Selectors";