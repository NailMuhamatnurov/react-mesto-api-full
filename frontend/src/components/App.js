import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteQuestionForm from './DeleteQuestionForm';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth.js';

function App() {
  
    const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
    const [isAddPlacePopupOpen, setAddCardClick] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({element: {}, isOpen: false});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [selectedCardDeleteQuestion, setSelectedCardDeleteQuestion] = React.useState({isOpen: false, card: {}});
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isInfoTooltip, setInfoTooltip] = React.useState({isOpen: false, successful: false});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const history = useHistory();
    
    React.useEffect(() => {
        if(loggedIn){
            api.getInitialCards()
            .then(data => {
                setCards(data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [loggedIn]);

    React.useEffect(() => {
        api.getUserData()
            .then(data => {
                handleLoggedIn();
                setEmail(data.email);
                setCurrentUser(data);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
        }, [history, loggedIn]);
    
    function handleEditAvatarClick() {
        setEditAvatarClick(true);
    }

    function handleEditProfileClick() {
        setEditProfileClick(true);
    }

    function handleAddCardClick() {
        setAddCardClick(true);
    }

    function handleCardClick(card) {
        setSelectedCard({...selectedCard, isOpen: true, element: card});
    }

    function handleDeleteCardClick(card) {
        setSelectedCardDeleteQuestion({...selectedCardDeleteQuestion, isOpen: true, card: card});
    }

    function handleLoggedIn() {
        setLoggedIn(true);
    }

    function handleInfoTooltip(result) {
        setInfoTooltip({...isInfoTooltip, isOpen: true, successful: result});
    }

    function closeAllPopups() {
        setEditAvatarClick(false);
        setEditProfileClick(false);
        setAddCardClick(false);
        setSelectedCard({element: {}, isOpen: false});
        setSelectedCardDeleteQuestion({...selectedCardDeleteQuestion, isOpen: false});
        setInfoTooltip(false);
    }

    function handleUpdateUser(userInfo) {
        setIsLoading(true);
        api.saveUserInfo(userInfo)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => {
                console.log('Ошибка ' + err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar(avatarInfo) {
        setIsLoading(true);
        api.changeAvatar(avatarInfo)
            .then((data) => {
                setCurrentUser({...currentUser, avatar: data.avatar}); 
                closeAllPopups();
            })
            .catch(err => {
                console.log('Ошибка ' + err);
            })
            .finally(() => {
                setIsLoading(false);
            }); 
    }

    function handleUpdatePlace(cardInfo) {
        setIsLoading(true);
        api.addNewCard(cardInfo)
        .then((data) => {
            setCards([data, ...cards]);
            closeAllPopups();
        })
        .catch(err => {
            console.log('Ошибка ' + err);
        })
        .finally(() => {
            setIsLoading(false);
        });   
    }

    
    function handleRegister(password, email){
        auth.register(password, email)
        .then(data => {
            if(data){
                handleInfoTooltip(true);
                history.push('/signin');
            } 
        })
        .catch(err => {
            console.log(err);
            handleInfoTooltip(false);
        })
    }

    function handleLogin (password, email) {
        auth.login(password, email)
        .then(data => {
            if(data.token){
                setEmail(email);
                handleLoggedIn();
                localStorage.setItem('token', data.token);
                history.push('/');
            }
        })
        .catch(err => {
            handleInfoTooltip(false);
            console.log(err);
        })
    }

    function handleCardDelete(card) {
        setIsLoading(true);
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id === card._id ? false : true))
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })    
            .finally(() => {
                setIsLoading(false);
            });    
}

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleSignOut() {
        auth.logout()
        .then(res => {
            setLoggedIn(false);
            setEmail('');
            history.push('/signin');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header email={email} onSignOut={handleSignOut}/>
                
                <Switch>
                    <ProtectedRoute 
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick} 
                        onAddCard={handleAddCardClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        card={cards}
                        onCardDelete={handleDeleteCardClick}
                    />
                    <Route path="/signin">
                        <Login onLogin={handleLogin}/>
                    </Route>

                    <Route path="/signup">
                        <Register onRegister={handleRegister}/>
                    </Route>

                    <Route>
                        {loggedIn ? (<Redirect to="/"/>) : (<Redirect to="/signin"/>)}
                    </Route>
                </Switch>

                <InfoTooltip result={isInfoTooltip} onClose={closeAllPopups}/>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
                
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleUpdatePlace} isLoading={isLoading}/>

                <DeleteQuestionForm deleteCard={selectedCardDeleteQuestion} onClose={closeAllPopups} onDeleteCard={handleCardDelete} isLoading={isLoading}/>
                
                <Footer />
            </div> 
        </CurrentUserContext.Provider> 
    
    );
};

export default App;
