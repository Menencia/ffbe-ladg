import { Component, OnInit } from '@angular/core';

import fontawesome from '@fortawesome/fontawesome';
import * as faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Add the icon to the library so you can use it in your page
    fontawesome.library.add(faSpinner);

  }

}
