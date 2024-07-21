// App imports
import { SvgMapSizesProvider } from './svgMap';
import { RoomsGaugeSizesProvider } from './rooms';
import { PricesSizesProvider } from './prices';
import { BottomSizesProvider } from './bottom';
import { TimeseriesSizesProvider } from './timeseries';

export const SizesProvider = ({children}: any) => {
  return (
   
    <SvgMapSizesProvider>
    <RoomsGaugeSizesProvider>
    <PricesSizesProvider>
    <BottomSizesProvider>
    <TimeseriesSizesProvider>
      {children}
    </TimeseriesSizesProvider>
    </BottomSizesProvider>
    </PricesSizesProvider>
    </RoomsGaugeSizesProvider>
    </SvgMapSizesProvider>
   
  )
}

SizesProvider.displayName="SizesProvider";