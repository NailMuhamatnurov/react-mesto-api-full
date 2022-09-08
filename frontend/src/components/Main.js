import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
    
   const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile page__section">
                <div className="profile__avatar opacity-link">
                    <img className="profile__image" src={currentUser.avatar} alt="Аватар"/>
                    <button className="profile__avatar-button" type="button" aria-label="Изменить аватар" onClick={props.onEditAvatar}></button>   
                </div>    
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button opacity-link" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button opacity-link" aria-label="Добавить фото" onClick={props.onAddCard}></button>
            </section>
            
            <section className="elements page__section">
                {props.card.map((item) => (
                    <Card key={item["_id"]} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
                )}
            </section>
        </main>
    );
}

export default Main;