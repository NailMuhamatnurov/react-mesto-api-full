import React from 'react';
import ok from '../images/ok.svg';
import err from '../images/error.svg';

function InfoTooltip({ onClose, result: { isOpen, successful } }) {

    return (
        <section className={`popup popup_type_info ${isOpen ? 'popup_opened' : false}`}>
            <div className="popup__container popup__container_type_info">
                <img className="popup__photo popup__photo_type_info" src={successful ? ok : err} alt='Индикатор выполнеия действия' />
                <h2 className={`popup__title popup__title_type_info`}>{successful ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть окно" />
            </div>
        </section>
  )
}
    
export default InfoTooltip;