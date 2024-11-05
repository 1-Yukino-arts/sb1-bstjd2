import { EventData, Page } from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';

let page: Page;
let viewModel: HelloWorldModel;

export function navigatingTo(args: EventData) {
    page = <Page>args.object;
    viewModel = new HelloWorldModel();
    page.bindingContext = viewModel;
}

export function onAddImage() {
    viewModel.onTap();
}