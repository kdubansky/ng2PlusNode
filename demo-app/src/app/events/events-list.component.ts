import { Component } from '@angular/core';

@Component({
    selector: `events-list`,
    styleUrls: ['./events-list.component.css'],
    templateUrl: 'events-list.component.html'
})

export class EventsListComponent{
    person = {
        id: 1,
        firstName: 'Kevin',
        lastName: 'Dub',
        age: 33,
        job:'Web Developer'
    }
}