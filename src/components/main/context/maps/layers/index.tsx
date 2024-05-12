// App imports
import { IsoLayerProvider } from './iso';
import { PointsLayerProvider } from './points';
import { IconLayerProvider } from './icon';
import { HeatmapLayerProvider } from './heatmap';

export const LayersProvider = ({children}: any) => {
  return (
    <IsoLayerProvider>
    <PointsLayerProvider>
    <IconLayerProvider>
    <HeatmapLayerProvider>
      {children}
    </HeatmapLayerProvider>
    </IconLayerProvider>
    </PointsLayerProvider>
    </IsoLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";