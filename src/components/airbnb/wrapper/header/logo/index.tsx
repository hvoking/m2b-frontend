// App imports
import './styles.scss';

// Third-party imports
import { useNavigate } from 'react-router-dom';

export const Logo = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate('/')
	}

	return (
		<img 
			className="gnrt-logo"
			src="static/logos/gnrt.svg" 
			alt="gnrt-logo"
			onClick={onClick}
		/>
	)
}

Logo.displayName="Logo";