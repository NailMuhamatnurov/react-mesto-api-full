import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function inputPlace(e) {
        setName(e.target.value);
    }
    
    function inputLink(e) {
        setLink(e.target.value);
    }
    
    function handleAddPlaceSubmit(e) {
        e.preventDefault();
      
        props.onUpdatePlace({
            name,
            link
        });
      } 
  
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]); 

    return (
        <PopupWithForm name='add' title='Новое место' button={props.isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
            <input value={name} type="text" placeholder="Название" id="place" className="popup__input" minLength="2" maxLength="30" name="name" required onChange={inputPlace}/>
            <span id="place-error" className="popup__input-error" >введите новое место</span>
            <input value={link} type="url" placeholder="Ссылка на картинку" id="image-link" className="popup__input" name="link" required onChange={inputLink}/>
            <span id="image-link-error" className="popup__input-error" >введите адрес картинки</span>
        </PopupWithForm> 
    )
}

export default AddPlacePopup;