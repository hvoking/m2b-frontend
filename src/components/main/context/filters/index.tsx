// App imports
import { PropertyTypeProvider } from './property';
import { EquipmentProvider } from './equipment';
import { DatesProvider } from './dates';
import { PricesProvider } from './prices';
import { AreasProvider } from './areas';
import { GeoProvider } from './geo';
import { PdfProvider } from './pdf';
import { CategoryProvider } from './category';

export const FiltersProvider = ({children}: any) => {
  return (
    <PropertyTypeProvider>
    <EquipmentProvider>
    <GeoProvider>
    <DatesProvider>
    <PricesProvider>
    <AreasProvider>
    <PdfProvider>
    <CategoryProvider>
      {children}
    </CategoryProvider>
    </PdfProvider>
    </AreasProvider>
    </PricesProvider>
    </DatesProvider>
    </GeoProvider>
    </EquipmentProvider>
    </PropertyTypeProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";

export * from './property';
export * from './equipment';
export * from './dates';
export * from './prices';
export * from './areas';
export * from './geo';
export * from './pdf';
export * from './category';