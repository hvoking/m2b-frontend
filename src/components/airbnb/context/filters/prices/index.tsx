import { useState, useContext, createContext } from 'react';

const PricesContext: React.Context<any> = createContext(null)

export const usePrices = () => {
	return (
		useContext(PricesContext)
	)
}

export const PricesProvider = ({children}: any) => {
	const [ discount, setDiscount ] = useState(-5);
	const [ samplesPrices, setSamplesPrices ] = useState<any>(null);

	const [ sampleUrl, setSampleUrl ] = useState<any>(null);
	const [ submitUrl, setSubmitUrl ] = useState(false);

	const [ priceMin, setPriceMin ] = useState(null);
	const [ priceMax, setPriceMax ] = useState(null);
	
	const [ leftPosition, setLeftPosition ] = useState(null);
	const [ rightPosition, setRightPosition ] = useState(null);

	return (
		<PricesContext.Provider value={{
			priceMin, setPriceMin, 
			priceMax, setPriceMax,
			discount, setDiscount,
			samplesPrices, setSamplesPrices,
			leftPosition, setLeftPosition,
			rightPosition, setRightPosition,
			sampleUrl, setSampleUrl,
			submitUrl, setSubmitUrl,
		}}>
			{children}
		</PricesContext.Provider>
	)
}

PricesContext.displayName = "PricesContext";