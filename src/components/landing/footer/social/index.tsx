// App imports
import { SocialMediaLinks } from './links';

export const SocialMedia = () => {
	return (
		<div>
			<div style={{fontWeight: "500"}}>
				Redes Sociais
			</div>
			<SocialMediaLinks/>
		</div>
	)
}

SocialMedia.displayName="SocialMedia";