// App imports
import { IsoLayerProvider } from './iso';
import { CitiesLayerProvider } from './cities';
import { PointsLayerProvider } from './points';
import { IconLayerProvider } from './icon';
import { HeatmapLayerProvider } from './heatmap';

export const LayersProvider = ({children}: any) => {
  return (
    <IsoLayerProvider>
    <CitiesLayerProvider>
    <PointsLayerProvider>
    <IconLayerProvider>
    <HeatmapLayerProvider>
      {children}
    </HeatmapLayerProvider>
    </IconLayerProvider>
    </PointsLayerProvider>
    </CitiesLayerProvider>
    </IsoLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";