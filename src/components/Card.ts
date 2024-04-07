import { Component } from './base/Component';
import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { categoryColor } from '../utils/constants';

categoryColor.set('софт-скил', '_soft');
categoryColor.set('другое', '_other');
categoryColor.set('дополнительное', '_additional');
categoryColor.set('кнопка', '_button');
categoryColor.set('хард-скил', '_hard');

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._price = ensureElement<HTMLImageElement>(`.card__price`, container);
		this._image = container.querySelector(`.card__image`);
		this._category = container.querySelector(`.card__category`);
		this._button = container.querySelector(`.card__button`);
		this._description = container.querySelector(`.card__text`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: string) {
		if (value) {
			this.setText(this._price, `${value} синапсов`);
		} else {
			this.setText(this._price, 'Бесценно');
		}
		if (this._button) {
			this._button.disabled = !value;
		}
	}

	get price(): string {
		return this._price.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
		if (this._category) {
			if (categoryColor.has(this._category.textContent)) {
				this._category.classList.add(
					`card__category${categoryColor.get(this._category.textContent)}`
				);
			} else {
				this._category.classList.add(`card__category_default`);
			}
		}
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set description(value: string | string[]) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}
