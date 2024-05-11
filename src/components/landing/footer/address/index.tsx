// App imports
import './styles.scss';

export const Address = () => {
	return (
		<div className="landing-address-wrapper">
			<div className="address-title">Endereço</div>
			<div>
				Rua Sete de Setembro, número 644, Centro <br/>
				CEP 89010-200, Blumenau, SC, Brasil
			</div>
		</div>
	)
}

Address.displayName="Address";