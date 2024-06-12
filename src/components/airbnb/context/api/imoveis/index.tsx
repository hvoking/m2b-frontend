// App imports
import { RoomsApiProvider } from './rooms';
import { PointsApiProvider } from './points';
import { PricesApiProvider } from './prices';
import { LinesApiProvider } from './lines';
import { SamplesApiProvider } from './samples';

export const ImoveisApiProvider = ({children}: any) => {
  return (
    <RoomsApiProvider>
    <PointsApiProvider>
    <LinesApiProvider>
    <PricesApiProvider>
    <SamplesApiProvider>
      {children}
    </SamplesApiProvider>
    </PricesApiProvider>
    </LinesApiProvider>
    </PointsApiProvider>
    </RoomsApiProvider>
  )
}

ImoveisApiProvider.displayName="ImoveisApiProvider";