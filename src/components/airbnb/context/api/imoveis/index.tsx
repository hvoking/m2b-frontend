// App imports
import { RoomsApiProvider } from './rooms';
import { PointsApiProvider } from './points';
import { PricesApiProvider } from './prices';
import { LinesApiProvider } from './lines';

export const ImoveisApiProvider = ({children}: any) => {
  return (
    <RoomsApiProvider>
    <PointsApiProvider>
    <LinesApiProvider>
    <PricesApiProvider>
      {children}
    </PricesApiProvider>
    </LinesApiProvider>
    </PointsApiProvider>
    </RoomsApiProvider>
  )
}

ImoveisApiProvider.displayName="ImoveisApiProvider";