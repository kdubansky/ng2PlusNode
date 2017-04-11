import { Component, Input } from '@angular/core';

@Component({
    selector: `event-thumbnail`,
    styleUrls: ['./events-list.component.css'],
    template: 
    `
    <md-card class="example-card">
        <md-card-content>
            <h2>First Name: {{person.firstName}}</h2>
            <h2>Last Name: {{person.lastName}}</h2>
            <h2>Age: {{person.age}}</h2>
            <h2>Job: {{person.job}}</h2>
        </md-card-content>
        <md-card-footer>
            <button md-button>RAISED</button>
        </md-card-footer>
    </md-card>
    
    `
})

export class EventThumbnailComponent{
    @Input() person: any
}