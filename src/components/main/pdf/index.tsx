// App Imports
import { Page2 } from './page2';
import { Page1 } from './page1';
import './styles.scss';

// Context imports
import { usePdf } from '../context';

export const UserPdf = () => {
	const { page1Ref, page2Ref, printDocument, activePdf, setActivePdf } = usePdf();

	return (
		<>
			{activePdf && 
				<div 
					className="user-pdf" 
					onClick={() => setActivePdf(false)}
					tabIndex={0}
				>
					<Page1 page1Ref={page1Ref} setActivePdf={setActivePdf}/>	
					<Page2 page2Ref={page2Ref} setActivePdf={setActivePdf} printDocument={printDocument}/>
				</div>
			}
		</>
	)
}

UserPdf.displayName="UserPdf";