import { TableDefaultComponent } from './table-default.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [TableDefaultComponent],
    exports: [TableDefaultComponent]
})

export class TableDefaultModule{ }