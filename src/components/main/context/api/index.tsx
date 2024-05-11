// App imports
import { IsoApiProvider } from './iso';
import { GoogleApiProvider } from './google';
import { ImoveisApiProvider } from './imoveis';
import { IsoPolygonApiProvider } from './isoPolygon';

export const ApiProvider = ({children}: any) => {
  return (
    <IsoPolygonApiProvider>
    <IsoApiProvider>
    <GoogleApiProvider>
    <ImoveisApiProvider>
      {children}
    </ImoveisApiProvider>
    </GoogleApiProvider>
    </IsoApiProvider>
    </IsoPolygonApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";