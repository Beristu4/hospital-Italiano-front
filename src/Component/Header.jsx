import './header.Module.css';
import imgLogo from '../imagenes/Logo.png';

const Header = () =>{
    return(
        <header className="header-container">
            <div className="logo">
                <img src={imgLogo} alt="Logo-Hospital-Italiano" />
            </div>
            <div className="text">
                <h1>ND</h1>
                <p>NUTRICION DEPORTIVA</p>
            </div>
        </header>
    )
}

export default Header;