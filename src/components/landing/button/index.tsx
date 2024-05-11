// App imports
import './styles.scss';

// Third-party imports
import { useNavigate } from 'react-router-dom';

export const Button = () => {
	const navigate = useNavigate();
	const onClick = () => navigate('/m2b');

	return (
		<button 
			className="subscribe-button" 
			type='submit' 
			onClick={onClick}
		>
			conhecer
		</button>
	)
}

Button.displayName="Button";