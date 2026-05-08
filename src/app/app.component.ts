
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { codeSlashOutline, codeSlashSharp, homeOutline, homeSharp, layersOutline, layersSharp, logoGithub, mailOutline, mailSharp, personCircleOutline, personCircleSharp, personOutline, personSharp, schoolOutline, schoolSharp, terminalOutline, terminalSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
      { title: 'Inicio', url: '/inicio', icon: 'home' },
      { title: 'Información Personal', url: '/informacion', icon: 'person' },
      { title: 'Contacto', url: '/contacto', icon: 'mail' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    addIcons({
      homeOutline, homeSharp,
      personOutline, personSharp,
      mailOutline, mailSharp,
      personCircleOutline, personCircleSharp,
      schoolOutline, schoolSharp,
      codeSlashOutline, codeSlashSharp,
      logoGithub,

      layersOutline, layersSharp,
      terminalOutline, terminalSharp

      });
  }
}
