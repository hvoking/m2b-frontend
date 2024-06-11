import { useState, useContext, createContext } from 'react';

const PricesContext: React.Context<any> = createContext(null)

export const usePrices = () => {
	return (
		useContext(PricesContext)
	)
}

export const PricesProvider = ({children}: any) => {
	const [ detachment, setDetachment ] = useState(15);
	const [ discount, setDiscount ] = useState(-5);
	const [ samplesPrices, setSamplesPrices ] = useState<any>(null);

	const [ sampleUrl, setSampleUrl ] = useState<any>(null);
	const [ submitUrl, setSubmitUrl ] = useState(false);

	const [ priceMin, setPriceMin ] = useState(null);
	const [ priceMax, setPriceMax ] = useState(null);
	
	const [ leftPosition, setLeftPosition ] = useState(0);
	const [ rightPosition, setRightPosition ] = useState(10000);

	return (
		<PricesContext.Provider value={{
			priceMin, setPriceMin, 
			priceMax, setPriceMax,
			detachment, setDetachment,
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