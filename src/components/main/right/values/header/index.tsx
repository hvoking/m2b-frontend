// App imports
import { Switch } from './switch';

export const Header = () => {
  return (
    <div className="sidebar-header">
      <div className="sidebar-sub-title">Valores sugeridos R$</div>
      <div></div>
      <Switch on="m²" off="total"/>
    </div>
  )
}