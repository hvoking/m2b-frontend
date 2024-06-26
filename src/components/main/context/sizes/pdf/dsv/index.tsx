// React imports
import { useState, useContext, createContext } from 'react';

const PdfDsvSizesContext: React.Context<any> = createContext(null)

export const usePdfDsvSizes = () => {
	return (
		useContext(PdfDsvSizesContext)
	)
}

export const PdfDsvSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 0, right: 20, left: 40 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<PdfDsvSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</PdfDsvSizesContext.Provider>
	)
}

PdfDsvSizesContext.displayName = "PdfDsvSizesContext";