// App imports
import { AreasApiProvider } from './areas';
import { DsvApiProvider } from './dsv';
import { RoomsApiProvider } from './rooms';
import { PricesApiProvider } from './prices';
import { LinesApiProvider } from './lines';
import { HistApiProvider } from './hist';
import { HistPointsApiProvider } from './histPoints';
import { ImagesApiProvider } from './images';

export const ImoveisApiProvider = ({children}: any) => {
  return (
    <AreasApiProvider>
    <RoomsApiProvider>
    <DsvApiProvider>
    <HistApiProvider>
    <HistPointsApiProvider>
    <LinesApiProvider>
    <PricesApiProvider>
    <ImagesApiProvider>
      {children}
    </ImagesApiProvider>
    </PricesApiProvider>
    </LinesApiProvider>
    </HistPointsApiProvider>
    </HistApiProvider>
    </DsvApiProvider>
    </RoomsApiProvider>
    </AreasApiProvider>
  )
}

ImoveisApiProvider.displayName="ImoveisApiProvider";