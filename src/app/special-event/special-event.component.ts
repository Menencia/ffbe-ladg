import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chapter } from '../models/chapter';
import { Season } from '../models/season';
import { SpecialEvent } from '../models/special-event';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {

  public season: Season;
  public specialEvent: SpecialEvent;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public data: DataService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.loadSpecialEvent(params['specialEvent']);
      });
  }

  loadSpecialEvent(c) {
    const {specialEvent} = this.data.getSpecialEvent(c);
    this.specialEvent = specialEvent;
  }

}
