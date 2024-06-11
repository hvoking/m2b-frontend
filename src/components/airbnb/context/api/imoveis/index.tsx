// App imports
import { RoomsApiProvider } from './rooms';
import { PointsApiProvider } from './points';
import { PricesApiProvider } from './prices';
import { LinesApiProvider } from './lines';
import { SamplesApiProvider } from './samples';
import { MeanApiProvider } from './mean';

export const ImoveisApiProvider = ({children}: any) => {
  return (
    <RoomsApiProvider>
    <PointsApiProvider>
    <LinesApiProvider>
    <PricesApiProvider>
    <SamplesApiProvider>
    <MeanApiProvider>
      {children}
    </MeanApiProvider>
    </SamplesApiProvider>
    </PricesApiProvider>
    </LinesApiProvider>
    </PointsApiProvider>
    </RoomsApiProvider>
  )
}

ImoveisApiProvider.displayName="ImoveisApiProvider";