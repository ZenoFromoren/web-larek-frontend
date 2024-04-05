import { Basket } from './components/common/Basket';
import { IProduct, OrderForm } from './types/index';
import { AppData } from './components/AppData';
import { Page } from './components/Page';
import { WebLarekAPI } from './components/WebLarekAPI';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/Card';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';

const api = new WebLarekAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const modalCardTemplate = ensureElement<HTMLElement>('#modal-container');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();

const appData = new AppData(events);

const modal = new Modal(events, modalCardTemplate);
const page = new Page(events, document.body);
const basket = new Basket(events, cardBasketTemplate);
const orderForm = new Order(events, cloneTemplate(orderTemplate));
const contactsForm = new Contacts(events, cloneTemplate(contactsTemplate));
const successForm = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
		appData.clearBasket();
		events.emit('basket:change');
	},
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

events.on('items:change', (items: IProduct[]) => {
	page.catalog = items.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render(item);
	});
});

events.on('preview:change', (item: IProduct) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (appData.inBasket(item)) {
				appData.removeFromBasket(item);
				card.button = 'В корзину';
			} else {
				appData.addToBasket(item);
				card.button = 'Удалить из корзины';
			}
		},
	});

	card.button = appData.inBasket(item) ? 'Удалить из корзины' : 'В корзину';
	modal.render({ content: card.render(item) });
});

events.on('basket:change', () => {
	page.counter = appData.basket.items.length;

	basket.items = appData.basket.items.map((id) => {
		const item = appData.items.find((item) => item.id === id);
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => appData.removeFromBasket(item),
		});
		return card.render(item);
	});

	basket.total = appData.basket.total;
});

events.on('basket:open', () => {
	modal.render({ content: basket.render() });
});

events.on('order:open', () => {
	modal.render({
		content: orderForm.render({
			payment: 'card',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:ready', () => {
	api.createOrderProducts(appData.order);
	modal.render({
		content: successForm.render({
			total: appData.basket.total,
		}),
	});
});

events.on(
	/^order\..*:change$/,
	(data: { field: keyof OrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change$/,
	(data: { field: keyof OrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('formErrors:change', (error: Partial<OrderForm>) => {
	const { payment, email, phone, address } = error;
	orderForm.valid = !payment && !address;
	contactsForm.valid = !email && !phone;
});

api
	.getProductsList()
	.then(appData.setItems.bind(appData))
	.catch((err) => console.log(err));
