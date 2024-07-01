// Context imports
import { useReverseGeocodingApi } from '../../../context/api/google/reverse';

export const Info = () => {
	const { currentAddress } = useReverseGeocodingApi();

	const cidade = currentAddress[3].long_name;
	const bairro = currentAddress[2].long_name;
	const estado = currentAddress[4].long_name;
	const cep = currentAddress[6] && currentAddress[6].long_name;

	return (
		<div style={{display: "grid"}}>
			<div className="pdf-header-subtitle" style={{paddingLeft: "20px", paddingTop: "10px", display: "flex", gap: "10px"}}>
				Informações Gerais
			</div>
			<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridRowGap: "10px", paddingLeft: "20px", paddingTop: "10px", paddingBottom: "10px"}}>
				<div>
					Cidade: {cidade}
				</div>
				<div>
					Bairro: {bairro}
				</div>
				<div>
					Estado: {estado}
				</div>
				{currentAddress[6] && <div>
					CEP: {cep}
				</div>}
			</div>
		</div>
	)
}