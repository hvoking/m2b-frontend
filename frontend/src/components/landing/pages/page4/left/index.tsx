// App imports
import { Button } from '../../../button';

export const Left = () => {
	return (
		<div className="pages-description-wrapper">
			<div className="pages-subtitle-big">
				metro <br/>
				quadrado <br/>
				de bolso
			</div>
			<div className="pages-description">
				tenha acesso ao valor do metro <br/>
				quadrado e a organização do <br/>
				mercado em qualquer lugar.
			</div>
			<Button/>
		</div>
	)
}

Left.displayName="Left";