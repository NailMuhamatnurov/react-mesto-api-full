import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : false}`}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form " name={`popup-form-${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__submit-button" type="submit" aria-label="Сохранить">{props.button}</button>
                </form>
                <button className="popup__close opacity-link" type="button" aria-label="Закрыть окно" onClick={props.onClose}></button>
            </div>
        </div>    
    );
}

export default PopupWithForm;