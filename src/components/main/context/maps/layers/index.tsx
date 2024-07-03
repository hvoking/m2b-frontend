// App imports
import { PointsLayerProvider } from './points';
import { IconLayerProvider } from './icon';

export const LayersProvider = ({children}: any) => {
  return (
    <PointsLayerProvider>
    <IconLayerProvider>
      {children}
    </IconLayerProvider>
    </PointsLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";