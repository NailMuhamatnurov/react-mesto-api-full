import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

const [name, setName] = React.useState('');
const [description, setDescription] = React.useState('');
const currentUser = React.useContext(CurrentUserContext);

React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
}, [currentUser, props.isOpen]); 

function inputName(e) {
    setName(e.target.value);
}

function inputDescription(e) {
    setDescription(e.target.value);
}

function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
        name,
        about: description,
    });
  } 

return (
    <PopupWithForm name='profile' title='Редактировать профиль' button={props.isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя" id="name" className="popup__input" minLength="2" maxLength="40" name="name" onChange={inputName} required value={name || ''}/>
        <span id="name-error" className="popup__input-error">вы пропустили это поле</span>
        <input type="text" placeholder="О себе" id="description" className="popup__input" minLength="2" maxLength="200" name="about" onChange={inputDescription} required value={description || ''}/>
        <span id="description-error" className="popup__input-error" >введите описание карточки</span>
    </PopupWithForm> 
)
}

export default EditProfilePopup;