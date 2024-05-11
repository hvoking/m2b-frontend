// App imports
import './styles.scss';

// Third-party imports
import { useNavigate } from 'react-router-dom';

export const Button = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate('/m2b')
	}
	
	return (
		<div className="subscribe-header-button-wrapper">
			<button 
				className="subscribe-header-button" 
				type='submit' 
				onClick={onClick}
			>
				teste o m²b
			</button>
		</div>
	)
}

Button.displayName="Button";