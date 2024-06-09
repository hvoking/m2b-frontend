// App imports
import { PointsLayerProvider } from './points';
import { IconLayerProvider } from './icon';
import { HeatmapLayerProvider } from './heatmap';

export const LayersProvider = ({children}: any) => {
  return (
    <PointsLayerProvider>
    <IconLayerProvider>
    <HeatmapLayerProvider>
      {children}
    </HeatmapLayerProvider>
    </IconLayerProvider>
    </PointsLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";