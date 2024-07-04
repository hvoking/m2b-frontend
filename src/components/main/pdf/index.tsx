import { useRef } from 'react';

// App Imports
import { Page2 } from './page2';
import { Page1 } from './page1';
import './styles.scss';

// Context imports
import { usePdf } from '../context/filters/pdf';

export const UserPdf = () => {
	const { page1Ref, page2Ref, printDocument, activePdf, setActivePdf } = usePdf();
	const draggableRef = useRef<any>(null);
	const offsetY = useRef<any>(0);
	const isDragging = useRef(false);

	let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {

		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	const handleStart = (e: any) => {
		e.stopPropagation()
        offsetY.current = (e.clientY || e.touches[0].clientY) - draggableRef.current.getBoundingClientRect().top;
        isDragging.current = true;

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);
    };

    const handleMove = (e: any) => {
        if (isDragging.current) {
        	const clientY = e.clientY || e.touches[0].clientY;
        	const offset = clientY - offsetY.current;
            const newTop = offset < 60 ? 60 : offset;
            if (newTop) {
                requestAnimationFrame(() => {
                    draggableRef.current.style.top = `${newTop}px`;
                });
            }
        }
    };

    const handleEnd = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
    };

	return (
		<>
			{activePdf && 
				<div 
					className="user-pdf" 
					onClick={() => setActivePdf(false)}
					tabIndex={0}
					ref={draggableRef} 
					onMouseDown={handleStart} 
					onTouchStart={handleStart}
				>
					<Page1 page1Ref={page1Ref} setActivePdf={setActivePdf}/>	
					<Page2 page2Ref={page2Ref} setActivePdf={setActivePdf} printDocument={printDocument}/>
				</div>
			}
		</>
	)
}

UserPdf.displayName="UserPdf";