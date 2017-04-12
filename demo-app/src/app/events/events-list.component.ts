import { Component } from '@angular/core'
import { EventService } from './shared/events.service'

@Component({
    selector: `events-list`,
    styleUrls: ['events-list.component.css'],
    templateUrl: 'events-list.component.html'
})

export class EventsListComponent{

    people: any[]

    constructor(private eventService: EventService){
        this.people = this.eventService.getPeople()
    }
    
    //---------------------------------
    handleEventClicked(data){
        console.log('recieved: ' + data)
    }
}