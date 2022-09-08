import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteQuestionForm({ deleteCard:{ isOpen, card }, onClose, onDeleteCard, isLoading }) { 
    
    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(card);
    }
    
    return (
        <PopupWithForm name='question' title='Вы уверены?' button={isLoading ? 'Удаление...' : 'Да'} onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}/>
    )
}

export default DeleteQuestionForm;