import { Observable } from '@nativescript/core';

export class HelloWorldModel extends Observable {
    private _message: string;

    constructor() {
        super();
        this._message = 'Toque para começar!';
        this.notifyPropertyChange('message', this._message);
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value);
        }
    }

    onTap() {
        this.message = 'Botão clicado! ' + new Date().toLocaleTimeString();
    }
}