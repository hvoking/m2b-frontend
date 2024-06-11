// App Imports
import { Page2 } from './page2';
import { Page1 } from './page1';
import './styles.scss';

// Context imports
import { usePdf } from '../context/filters/pdf';

export const UserPdf = () => {
	const { page1Ref, page2Ref, activePdf, setActivePdf } = usePdf();

	let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {

		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	return (
		<>
			{activePdf && 
				<div 
					className="user-pdf" 
					onClick={() => setActivePdf(false)}
					tabIndex={0}
				>
					<Page1 page1Ref={page1Ref} setActivePdf={setActivePdf}/>	
					<Page2 page2Ref={page2Ref} setActivePdf={setActivePdf}/>
				</div>
			}
		</>
	)
}

UserPdf.displayName="UserPdf";