import { Component } from '@angular/core';

@Component({
    selector: `events-list`,
    template: `
    <div>
        <h1> ng 2 events</h1>
        <hr>
        <h2>First Name: {{person.firstName}}</h2>
        <h2>Last Name: {{person.lastName}}</h2>
        <h2>Age: {{person.age}}</h2>
        <h2>Job: {{person.job}}</h2>
    </div>
    `
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