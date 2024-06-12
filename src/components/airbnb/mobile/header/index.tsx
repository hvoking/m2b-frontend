// App imports
import './styles.scss';

export const Header = ({ activeIndex, setActiveIndex }: any) => {
	const active = (index: any) => {
		if (activeIndex === index) {
		 return "rgba(255, 255, 255, 1)"
		}
		return "rgba(126, 126, 132, 1)" 
	}
	return (
		<div className="carousel-header">
			<div onClick={() => setActiveIndex(0)} style={{color: active(0)}}>
				Rooms
			</div>
			<div onClick={() => setActiveIndex(1)} style={{color: active(1)}}>
				Prices
			</div>
			<div onClick={() => setActiveIndex(2)} style={{color: active(2)}}>
				Dates
			</div>
			<div onClick={() => setActiveIndex(3)} style={{color: active(3)}}>
				Prices
			</div>
		</div>
	)
}

Header.displayName="Header";