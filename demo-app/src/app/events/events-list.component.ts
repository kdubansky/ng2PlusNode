import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/events.service'

@Component({
    selector: `events-list`,
    styleUrls: ['events-list.component.css'],
    templateUrl: 'events-list.component.html'
})

export class EventsListComponent implements OnInit{

    people: any[]
    constructor(private eventService: EventService){
        
    }


    ngOnInit(){
        this.people = this.eventService.getPeople()
    }

    //---------------------------------
    handleEventClicked(data){
        console.log('recieved: ' + data)
    }
}