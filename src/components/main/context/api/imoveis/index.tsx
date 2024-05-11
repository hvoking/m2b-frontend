// App imports
import { AreasApiProvider } from './areas';
import { DsvApiProvider } from './dsv';
import { RoomsApiProvider } from './rooms';
import { PointsApiProvider } from './points';
import { PricesApiProvider } from './prices';
import { LinesApiProvider } from './lines';
import { SamplesApiProvider } from './samples';
import { HistApiProvider } from './hist';
import { HistPointsApiProvider } from './histPoints';

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
    <SamplesApiProvider>
      {children}
    </SamplesApiProvider>
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