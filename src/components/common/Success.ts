import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import { ISuccess } from "../../types";

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _total: HTMLElement;
    protected _close: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

        // if (events?.onClick) {
        //     this._close.addEventListener('click', events.onClick);
        // }
    }
}
