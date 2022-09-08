import React from "react";

function ImagePopup(props) {
    return (
    <div className={`popup popup_type_photo popup_opened_dark-opacity" ${props.card.isOpen ? 'popup_opened' : false}`}>
        <div className="popup__container-photo">
            <img className="popup__photo" src={props.card.element.link} alt={`Фото ${props.card.element.name}`}/>
            <h2 className="popup__photo-title">{props.card.element.name}</h2>
            <button className="popup__close opacity-link" type="button" aria-label="Закрыть окно" onClick={props.onClose}></button>
        </div>
    </div>
    )
}

export default ImagePopup;