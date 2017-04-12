import { Injectable } from '@angular/core';

@Injectable()
export class EventService{
    getPeople(){
        return PEOPLE
    }
}
const PEOPLE = 
    [
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