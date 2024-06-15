// React imports
import { useEffect, useState, useContext, createContext } from 'react';

// Context imports
import { usePrices } from '../../../filters/prices';

const SamplesApiContext: React.Context<any> = createContext(null)

export const useSamplesApi = () => {
	return (
		useContext(SamplesApiContext)
	)
}

export const SamplesApiProvider = ({children}: any) => {
	const [ samplesData, setSamplesData ] = useState<any>(null);
	const { samplesPrices } = usePrices();

	useEffect(() => {
		const postData = async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/airbnb_samples_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					'samples': samplesPrices
				}),
			});
			const receivedData = await res.json();
			setSamplesData(receivedData);
		}
		samplesPrices && postData();
	}, [ samplesPrices ]);

	return (
		<SamplesApiContext.Provider value={{ samplesData }}>
			{children}
		</SamplesApiContext.Provider>
	)
}

SamplesApiContext.displayName = "SamplesApiContext";