// App imports
import { AreasApiProvider } from './areas';
import { DsvApiProvider } from './dsv';
import { RoomsApiProvider } from './rooms';
import { PointsApiProvider } from './points';
import { PricesApiProvider } from './prices';
import { LinesApiProvider } from './lines';
import { HistApiProvider } from './hist';
import { HistPointsApiProvider } from './histPoints';
import { ImagesApiProvider } from './images';
import { MeanApiProvider } from './mean';

export const ImoveisApiProvider = ({children}: any) => {
  return (
    <AreasApiProvider>
    <RoomsApiProvider>
    <DsvApiProvider>
    <HistApiProvider>
    <PointsApiProvider>
    <HistPointsApiProvider>
    <LinesApiProvider>
    <PricesApiProvider>
    <ImagesApiProvider>
    <MeanApiProvider>
      {children}
    </MeanApiProvider>
    </ImagesApiProvider>
    </PricesApiProvider>
    </LinesApiProvider>
    </HistPointsApiProvider>
    </PointsApiProvider>
    </HistApiProvider>
    </DsvApiProvider>
    </RoomsApiProvider>
    </AreasApiProvider>
  )
}

ImoveisApiProvider.displayName="ImoveisApiProvider";