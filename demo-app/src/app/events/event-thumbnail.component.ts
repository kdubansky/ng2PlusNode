import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: `event-thumbnail`,
    styleUrls: ['./events-list.component.css'],
    template: 
    `
    <md-card class="example-card">
        <md-card-content>
            <h2>First Name: {{person?.firstName}}</h2>
            <h2>Last Name: {{person?.lastName}}</h2>
            <h2>Age: {{person?.age}}
                <span *ngIf="person.age > 33"> - You are old</span> 
                <span *ngIf="person.age == 33"> - You are ok</span> 
                <span *ngIf="person.age < 33"> - You are young</span> 
            </h2>
            <h2>Job: {{person?.job}}</h2>
        </md-card-content>
        <md-card-footer>
            <button md-raised-button color="primary" (click)="handleClickMe()">PRIMARY</button>
        </md-card-footer>
    </md-card>
    `
})

export class EventThumbnailComponent{
    @Input() person: any
    @Output() eventClick = new EventEmitter()

    handleClickMe(){
        this.eventClick.emit(this.person.firstName)
    }

    logFoo(){
        console.log('foobar') 
    }

    someProperty:any = "some string"
}