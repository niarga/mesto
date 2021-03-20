/* --- Переменные ---*/

const popups = document.querySelectorAll('.popup'); // все popup-блоки
const cardAddButton = document.querySelector('.profile__add-button'); // ссылка на кнопку добавления новой карточки
const cardsContainer = document.querySelector('.cards'); // ссылка на grid-контейнер, в котором размещаются карточки
const cardTemplate = cardsContainer.querySelector('.card-template'); //ссылка на template карточки
// Переменные popup-блока добавления карточки
const cardAddPopup = document.querySelector('.popup_type_card-add');
// Переменные popup-блока zoom
const zoomPopup = document.querySelector('.popup_type_zoom');
const zoomImage = zoomPopup.querySelector('.zoom__image');
const zoomCaption = zoomPopup.querySelector('.zoom__caption');
const zoomCloseButton = zoomPopup.querySelector('.popup__close-button');
// Переменные блока profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// Переменные popup-блока редактирования информации о пользователе
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const profileCloseButton = profileEditPopup.querySelector('.popup__close-button');
// Добавляем формы
const profileEditForm = document.forms.edit; // форма редактирования профиля
const nameInput = profileEditForm.elements.username;
const descriptionInput = profileEditForm.elements.description;
const cardAddForm = document.forms.add; // форма добавления карточки
const titleInput = cardAddForm.elements.title;
const urlInput = cardAddForm.elements.url;



/* --- Функции --- */

// Функция показа popup
function showPopup(el){
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); // добавляем слушатель кнопки Esc
}

// Функция скрытия popup
function hidePopup(el){
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); // добавляем слушатель кнопки Esc
}

// Функция сохранения введенной информации профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    hidePopup(profileEditPopup);
}

// Функция создания карточки из template
function createCard(el){
  const newCard = cardTemplate.content.cloneNode(true); // клонируем template карточки в переменную newCard
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  newCardImage.src = el.link;
  newCardImage.alt = el.name;
  newCardTitle.textContent = el.name;
  return newCard;
}

// Функция автоматического добавления карточек из массива
function cardsRender(array, container){
  const card = array.map(createCard);
  container.append(...card);
}

// Функция добавления новой карточки пользователем
function addUserCard(evt){
  evt.preventDefault();
  const titleValue = titleInput.value;
  const urlValue = urlInput.value;
  const userCard = createCard({name: titleValue, link: urlValue});
  cardsContainer.prepend(userCard);
  cardAddForm.reset(); //очищаем форму
  hidePopup(cardAddPopup);
}

// Функция открытия popup-блока zoom (увеличенной картинки)
function zoomOpen(evt){
  const targetElement = evt.target;
  zoomImage.src = targetElement.src;
  zoomCaption.textContent = targetElement.alt;
  showPopup(zoomPopup);
}

// Функция закрытия popup кнопкой Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    hidePopup(openedPopup);
  }
}



/* События и действия */

// Отрисовываем исходные карточки из массива
cardsRender(initialCards, cardsContainer);

// Открытие popup редактирования профиля с заполнением полей ввода текущими значениями
profileEditButton.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  showPopup(profileEditPopup);
});

// Сохранение введенной информации профиля при клике на кнопку "Сохранить"
profileEditForm.addEventListener('submit', formSubmitHandler);

// Открытие новой карточки
cardAddButton.addEventListener('click', () => showPopup(cardAddPopup));

// Сохранение новой карточки
cardAddForm.addEventListener('submit', addUserCard);


// Закрытие всех popup кликом на оверлей или крестик
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        hidePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        hidePopup(popup)
      }
  })
})

// Интерактив карточки: лайк, удаление и зум картинки
cardsContainer.addEventListener('click', function(evt){
  if (evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_active');
  }
  if (evt.target.classList.contains('card__trash-button')){
    evt.target.closest('.card').remove();
  }
  if (evt.target.classList.contains('card__image')){
    zoomOpen(evt);
  }
});