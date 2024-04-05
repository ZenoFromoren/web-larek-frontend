# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Описание данных

### Интерфейсы и типы

#### IProduct
Описывает следующие типы данных для полей элемента продукта:
- id
- название
- изображение
- стоимость
- категория
- описание

#### IBasket
Описывает следующие типы данных для полей элемента корзины: 
- список покупок
- итоговая стоимость заказа

#### Тип PaymentMethod
Описывает тип метода оплаты товара, может принимать одно из двух значений: 
- `card` - выбран способ оплаты картой
- `cash` - выбран способ наличными средствами

#### IOrder
Описывает следующие типы данных, отправляемых на сервер при выполнении заказа: 
- тип оплаты
- адрес электронной почты
- номер телефона
- итоговая стоимость заказа
- список покупок

#### Тип OrderForm
Описывает типы данных для полей формы оформления заказа. Содержит те же поля и типы данных, что и `IOrder` за исключением `total` и `items`.

#### IOrderResult
Описывает следующие типы данных, получаемых с сервера после оформления заказа: 
- id продукта
- итоговая стоимость заказа

#### ISuccess
Описывает тип поля итоговой стоимости заказа для модального окна, уведомляющего о том, что заказ был выполнен успешно.

#### ISuccessActions
Описывает тип возвращаемого значения для функции `onClick` окна, уведомляющего о том, что заказ был выполнен успешно.

#### ICardActions
Описывает тип возвращаемого значения для функции `onClick` карточки товара.

#### IModalData
Описывает тип данных для содержимого модального окна.

#### IPage
Описывает типы данных для следующих компонентов главной страницы магазина:
- счётчик количества товаров в корзине
- список продуктов
- логическое значение, отображающее заблокирована прокрутка страницы или нет

#### IWebLarekAPI
Описывает типы принимаемых и возвращаемых данных для следующих методов: 
- `getProductsList` - получение списка продуктов
- `getProductItem` - получение отдельного продукта
- `createOrderProducts` - оформление заказа

#### Тип ApiListResponse&lt;Type&gt;
Является дженериком, принимает тип `Type`, описывает типы данных для следующих полей данных продукта, получаемого с сервера:
- итоговая стоимость заказа
- список товаров типа `Type`

#### Тип ApiPostMethods
Описывает методы отправки запросов на сервер. Может принимать одно из трёх значений:
- `POST` - метод для отправки данных на сервер
- `PUT` - метод для полного обновления указанного ресурса
- `DELETE` - метод для удаления ресурса с сервера

#### IEvents
Описывает методы взаимодействия с событиями:
- `on` - подписка на событие
- `emit` - инициализация события

#### Тип EventName
Описывает тип данных имени события.

#### Тип Subscriber
Описывает тип данных подписчика на событие.

#### IBasketView
Описывает следующие типы данных для полей экземпляра класса корзины: 
- список покупок
- итоговая стоимость заказа
- выбранные для покупки товары

#### IFormState
Описывает следующие типы данных для полей экземпляра класса формы:
- логическое значение, показывающее валидны ли данные формы
- список ошибок формы

#### Тип SelectorCollection&lt;T&gt;
Является дженериком, принимает тип `T`. Описывает тип данных элемента селектора, передаваемого в функцию `ensureAllElements`.

#### Тип SelectorElement&lt;T&gt;
Является дженериком, принимает тип `T`. Описывает тип данных элемента селектора, передаваемого в функцию `ensureElement`.

### Классы

#### Базовый код

#### Класс Component&lt;T&gt;
Базовый абстрактный класс. Является дженериком, принимает тип `T`. Используется для отображения содержимого страницы с помощью метода `render`, который принимает `T` в качестве типа отображаемых данных. От данного класса наследуются классы `View`, `Card` и `Success`.

#### Класс View&lt;T&gt;
Наследуется от класса `Component<T>`. Является дженериком, принимает тот же тип `T`, что и `Component<T>`. Отвечает за отображение элементов, генерирующих события. От данного класса наследуются классы  `Modal` и `Page`.

#### Класс EventEmitter
Брокер событий, реализующий паттерн "наблюдатель". Импелементирует интерфейс `IEvents`. Содержит поле `_events`, являющееся коллекцией пар ключ-значение, где ключом является имя события, а значением множество подписчиков этого события.

#### Класс Api
Предназначен для работы с запросами. Содержит поле базового URL `baseURL` и поле настроек `options`. Содержит следующие методы:
- `get` - принимает как аргумент строковый элемент эндпойнта `uri` и позволяет выполнить get-запрос к серверу на заданный эндпойнт
- `post` - принимает как аргумент строковый элемент эндпойнта `uri` и позволяет выполнить post-запрос к серверу на заданный эндпойнт

#### Классы отображения

#### Класс Card
Описывает элемент карточки товара в магазине. Содержит элемент кнопки. Наследуется от базового класса `Component<IProduct>`. Содержит методы `set` для установки значений параметров.

#### Класс Basket
Описывает элемент корзины с покупками. Содержит следующие поля:
- элемент списка покупок
- элемент, отображающего итоговую стоимость заказа
- элемент кнопки "Оформить"

Имплементирует интерфейс IBasketView и содержит методы `set` для установки описанных в нём полей.

#### Класс Order
Описывает заказ, оформляемый пользователем. Наследуется от класса `Form<OrderForm>`.
Содержит следующие защищённые поля:
- кнопка выбора спопоба оплаты картой
- кнопка выбора спопоба оплаты наличными средствами

Также Содержит методы `set` для установки значений полей адреса и способа оплаты.

#### Класс Contacts
Описывает форму заполнения контактных данных пользователя при оформлении заказа. Наследуется от класса `Form<OrderForm>`. Также содержит методы `set` для установки значений полей адреса электронной почты и номера телефона.

#### Класс Success
Отвечает за отображение содержимого модального окна, уведомляющего о том, что заказ был выполнен успешно. Наследуется от класса `Component<ISuccess>`.
Содержит следующие защищённые поля:
- элемент, отображающий итоговую стоимость заказа
- элемент кнопки закрытия модального окна

Также содержит метод `set` для установки текста итоговой стоимости заказа для соответствующего DOM-узла.

#### Класс Modal
Описывает элемент модального окна оформления заказа. Наследуется от класса `View<IModalData>`. Содержит поле, описывающее содержащийся внутри модального окна контент и поле кнопки оформления заказа. Содержит методы следующие методы:
- `open` -  отвечающие за отображение модального окна
- `close` - отвечающие за скрытие модального окна

#### Класс Form&lt;T&gt;
Описывает элемент формы заказа. Является дженериком, принимает тип `T`, ключи которого используются как аргументы в методах класса. Наследуется от класса `View<IFormState>`. 
Содержит следующие защищённые поля:
- кнопка для отправки введённых данных на сервер
- элемент, отображающий ошибки валидации формы

 Содержит следующие методы:
 - `onInputChange` - вызывает событие изменения текста в поле ввода данных
 - `render` - переопределяет родительский метод `render`, добавляя поле объекта состояний валидации формы, ошибок и данных, введённых в поля ввода
 - методы `set` для установки значений полей, описанных в интерфейсе `IFormState`

#### Класс Page
Описывает главную страницу магазина. Содержит следующие поля: 
- обёртка главной страницы
- каталог товаров
- элемент корзины
- счётчик количества товаров в корзине

Наследуется от класса `View<IPage>`, содержит метод `set` для установки значений полей, описанных в интерфейсе `IPage`.

#### Класс WebLarekAPI
Предназначен для взаимодействия с бэкэндом сервиса. Наследуется от класса `Api`, имплементирует интерфейс `IWebLarekAPI`. Содержит доступное только для чтения поле `cdn`. В конструкторе принимает поля `cdn`, базового URL `baseURL` и настроек `options`.
Содержит следующие методы, предназначенные для взаимодействия с бэкэндом сервиса:
- `getProductsList` - получение списка продуктов
- `getProductItem` - получение отдельного продукта
- `createOrderProducts` - оформление заказа

#### Модель данных
#### Класс AppData
Содержит в себе бизнес-логику хранения и изменения данных приложения. 
Содержит следующие поля:
- список продуктов
- корзина
- заказ
- `preview` - превью продута
- `formErrors` - ошибки формы оформления заказа

Содержит следующие методы для взаимодействия с компонентами:
- `clearBasket` - очистка корзины
- `setItems` - установка значения поля списка продуктов
- `setPreview` - установка превью
- `setOrderField` - установка значений полей заказа при вводе данных в поля ввода формы оформления заказа
- `validateOrder` - валидация формы оформления заказа
  
В конструкторе принимает защищённое поле экземпляра класса брокера событий `protected events`.

#### Презентер
В данном приложении презентером является код в файле `index.ts`. В данном файле описывается взаимодействие между слоем отображения и слоем данных.

### Список событий, используемых в приложении
#### События изменения модели данных
- `items:change` - изменение массива товаров каталога
- `preview:change` - изменение открываемого в модальном окне товара
- `basket:change` - изменение списка товаров корзины
- `order:ready` - данные форм оформления заказа валидны
- `formErrors:change` - изменение ошибки валидации  форм
#### События, возникающие при взаимодействии пользователя с интерфейсом
- `order:open` - открытие модального окна с формой оформления заказа
- `basket:open` - открытие модального окна корзины
- `card:select` - открытие описания товара в модальном окне
- `^order\..*:change` - изменение данных в форме с данными заказа
- `^contacts\..*:change` - изменение данных в форме с контактными данными
- `contacts:submit` - отправка формы контактных данных пользователя в модальном окне заказа
- `order:submit` - событие, генерируемое при отправке формы со способом оплаты и адресом
- `modal:open` - открытие любого модального окна
- `modal:close` - закрытие любого модального окна
