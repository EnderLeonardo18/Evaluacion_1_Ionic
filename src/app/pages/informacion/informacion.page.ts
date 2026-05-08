import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonAvatar, IonItem, IonList, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
  standalone: true,

  // Acá se importa las etiquetas especiales de Ionic que se estan usando
  imports: [IonLabel, IonIcon, IonItem, IonAvatar, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonList]
})
export class InformacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
