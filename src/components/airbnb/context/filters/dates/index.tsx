// React imports
import { useState, useContext, createContext } from 'react';

const DatesContext: React.Context<any> = createContext(null)

export const useDates = () => {
	return (
		useContext(DatesContext)
	)
}

export const DatesProvider = ({children}: any) => {
	const [ startDate, setStartDate ] = useState<any>("18-01-2023");
	const [ finalDate, setFinalDate ] = useState<any>("24-03-2024");
	const [ dates, setDates ] = useState([new Date("2023-01-18"), new Date("2024-03-24")]);

	return (
		<DatesContext.Provider value={{
			startDate, setStartDate, 
			finalDate, setFinalDate,
			dates, setDates,
		}}>
			{children}
		</DatesContext.Provider>
	)

}

DatesContext.displayName = "DatesContext";