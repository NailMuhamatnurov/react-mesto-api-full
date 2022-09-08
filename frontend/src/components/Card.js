import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__basket opacity-link ${isOwn ? 'element__basket_visible' : 'element__basket_hidden'}`
    ); 

    const isLiked = props.card.likes.some(i => i === currentUser._id);
    
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );    

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="element">
            <div className="element__photo">
                <img className="element__image" src={props.card.link} alt={`Фото ${props.card.name}`} onClick={handleClick}/>
                <button className={cardDeleteButtonClassName} type="button" aria-label="Корзина" onClick={handleDeleteClick}></button>
            </div>
            <div className="element__subtitle">
                <h2 className="element__title">{props.card.name}</h2>
                <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}>
                    <p className="element__like-sum">{props.card.likes.length}</p> 
                </button>
            </div>
        </div>
    )
}

export default Card;