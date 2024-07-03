// React imports
import { useState, useContext, createContext } from 'react';

const BarsSizesContext: React.Context<any> = createContext(null)

export const useBarsSizes = () => {
	return (
		useContext(BarsSizesContext)
	)
}

export const BarsSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 0, right: 60, left: 60 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<BarsSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</BarsSizesContext.Provider>
	)
}

BarsSizesContext.displayName = "BarsSizesContext";