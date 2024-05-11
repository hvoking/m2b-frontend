// App imports
import { LinesLimitsProvider } from './lines';
import { PointsLimitsProvider } from './points';
import { PricesLimitsProvider } from './prices';

export const LimitsProvider = ({children}: any) => {
  return (
    <LinesLimitsProvider>
    <PointsLimitsProvider>
    <PricesLimitsProvider>
      {children}
    </PricesLimitsProvider>
    </PointsLimitsProvider>
    </LinesLimitsProvider>
  )
}

LimitsProvider.displayName="LimitsProvider";