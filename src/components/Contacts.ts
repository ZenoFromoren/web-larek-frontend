import { OrderForm } from '../types';
import { EventEmitter } from './base/events';
import { Form } from './common/Form';

export class Contacts extends Form<OrderForm> {
	constructor(events: EventEmitter, container: HTMLFormElement) {
		super(events, container);

		this._submit.addEventListener('click', () => {
			events.emit('order:ready');
		});
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
}
