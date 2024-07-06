// App Imports
import { Top } from './top';
import { Bottom } from './bottom';
import { Footer } from '../footer';
import { CancelCross } from './cross';
import './styles.scss';

export const Page1 = ({ page1Ref, setActivePdf }: any) => {
	return (
		<div 
			className="user-pdf-first-page" 
			onClick={(e: any) => e.stopPropagation()}
			ref={page1Ref}
		>
			<div className="pdf-body">
				<CancelCross setActivePdf={setActivePdf}/>
				<Top/>
				<Bottom/>
			</div>
			<Footer/>
		</div>
	)
}

Page1.displayName="Page1";