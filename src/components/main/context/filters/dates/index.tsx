// React imports
import { useState, useContext, createContext } from 'react';

const DatesContext: React.Context<any> = createContext(null)

export const useDates = () => {
	return (
		useContext(DatesContext)
	)
}

export const DatesProvider = ({children}: any) => {
	const [ startDate, setStartDate ] = useState<any>("02-05-2023");
	const [ finalDate, setFinalDate ] = useState<any>("01-06-2024");
	const [ dates, setDates ] = useState([new Date("2023-05-01"), new Date("2024-06-01")]);

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