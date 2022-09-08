import React from 'react';
import logo from '../images/header__logo.svg';
import { Link, Route } from 'react-router-dom';

function Header({email, onSignOut}) {

    const [isClicked, setIsClicked] = React.useState(false);

    function handleClickMenu() {
        setIsClicked(!isClicked)
    }

    return (
        <header className="page__section">  
            <div className={`header header__menu ${isClicked ? "header__menu_active" : "header__menu_disactive"}`}>
                <p className="header__menu-email">{email}</p>
                <button onClick={() => {
                    onSignOut();
                    handleClickMenu();
                }} className="header__menu-link opacity-link">Выйти</button>
            </div>
            <div className="header">
                <img className="header__logo" src={logo} alt="Лого"/> 
                <Route path="/signin">
                    <Link to='signup' className="header__link header__link-reg opacity-link">Регистрация</Link>
                </Route>
                <Route path="/signup">
                    <Link to='signin' className="header__link opacity-link">Войти</Link>
                </Route>
                <Route exact path="/">
                    <p className="header__email">{email}</p>
                    <button onClick={onSignOut} className='header__link opacity-link'>Выйти</button>
                    <button onClick={handleClickMenu} className={`${isClicked ? "header__menu-button_disactive" : "header__menu-button opacity-link"}`}></button>
                    <button onClick={handleClickMenu} className={`${isClicked ? "header__cross-button opacity-link" : "header__cross-button_disactive"}`}></button>
                </Route>
            </div>
        </header>
    );
  }

  export default Header;