import { Component } from '@angular/core';

@Component({
    selector: `events-list`,
    styleUrls: ['events-list.component.css'],
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

    people = [
        {
        id: 1,
        firstName: 'Kevin',
        lastName: 'Dub',
        age: 33,
        job:'Web Developer'
    },
    {
        id: 1,
        firstName: 'Gus',
        lastName: 'Hill',
        age: 31,
        job:'Web Developer'
    },
    {
        id: 1,
        firstName: 'Some',
        lastName: 'Guy',
        age: 54,
        job:'Web Developer'
        },
    ]

    handleEventClicked(data){
        console.log('recieved: ' + data)
    }
}