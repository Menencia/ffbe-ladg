import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html'
})
export class VersionComponent implements OnInit {

  versions;

  constructor() {
    this.versions = [
      {b: '#1', l: 'Cette version a été enregistrée depuis YT sans son et avec la présence de la souris (grr).'},
      {b: '#2', l: 'Cette version a été enregistrée depuis YT sans son.'},
      {b: '#5', l: `Cette version est faite avec la version 5.x de Nox.
      Ce qui corrige un problème de son pendant les captures.`},
      {b: '#6', l: `Cette version est faite avec la version 6.x de Nox.`},
      {b: '#7', l: `Cette version est fait depuis la maj 3.0 du jeu.`},
    ];
  }

  ngOnInit() {
  }

}
