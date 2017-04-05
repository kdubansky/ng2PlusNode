import { Component } from '@angular/core';

import { HackHttpWrapper } from '../common/http/hack.http.wrapper';

@Component({
  selector: 'hack-navbar',
  templateUrl: './hack.navbar.component.html',
  styleUrls: ['./hack.navbar.component.css']
})
export class HackNavbarComponent {

  constructor(private hackHttpWrapper: HackHttpWrapper) {
    hackHttpWrapper.heyHey();
  }

}
