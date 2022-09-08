import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');
    const [link, setLink] = React.useState('');

function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
}

React.useEffect(() => {
    avatarRef.current.value = '';
}, [props.isOpen]);

    return (
        <PopupWithForm name='avatar' title='Обновить Аватар' button={props.isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="url" placeholder="Ссылка на картинку" id="image-link" className="popup__input" name="link" required ref={avatarRef}/> 
            <span id="image-link-error" className="popup__input-error" >введите адрес аватара</span>
        </PopupWithForm> 
    )
}

export default EditAvatarPopup;