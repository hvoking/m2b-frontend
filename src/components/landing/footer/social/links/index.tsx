// App imports
import { CurrentLink } from './current';

export const SocialMediaLinks = () => {
	return (
		<div className="footer-links">
			<CurrentLink
				mediaLink="https://api.whatsapp.com/send?phone=595986514207"
				mediaImage="static/components/landing/footer/whatsapp.png" 
				mediaAlt="whtasapp-logo"
			/>
			<CurrentLink
				mediaLink="https://www.instagram.com/gugonz"
				mediaImage="static/components/landing/footer/instagram.png" 
				mediaAlt="instagram-logo"
			/>
			<CurrentLink
				mediaLink="https://www.linkedin.com/in/computational-designer"
				mediaImage="static/components/landing/footer/linkedin.png" 
				mediaAlt="linkedin-logo"
			/>		
		</div>
	)
}

SocialMediaLinks.displayName="SocialMediaLinks";