import { GaugeSizesProvider } from './gauge';

export const PdfRoomsSizesProvider = ({ children }: any) => {
	return (
		<GaugeSizesProvider>
			{children}
		</GaugeSizesProvider>
	)
}

PdfRoomsSizesProvider.displayName="PdfRoomsSizesProvider";