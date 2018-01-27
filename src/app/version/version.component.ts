import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html'
})
export class VersionComponent implements OnInit {

  versions;

  constructor() {
    this.versions = [
      {b: '#1', l: 'Cette version comporte un fond bleu.'},
      {b: '#2', l: `Cette version comporte un fond noir/gris, plus agréable à regarder
      quand on est en fullscreen.`},
      {b: '#3', l: `Cette version ne comporte pas de fond. Par défaut, le fond est noir.
      La vidéo est adaptée au mode portrait d\'un mobile ou d\'une tablette.`},
      {b: '#4', l: `Cette version est faite avec le mode "auto" pour les dialogues.
      Ce qui fait que les vidéos sont plus courtes et qu\'on n\'entend plus les bruits
      de confirmation entre chaque dialogue.`},
      {b: '#5', l: `Cette version est faite avec la version 5.x de Nox.
      Ce qui corrige un problème de son pendant les captures.`},
      {b: '#6', l: `Cette version est faite avec la version 6.x de Nox.`},
    ];
  }

  ngOnInit() {
  }

}
