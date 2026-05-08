import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenu, IonMenuButton, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonAvatar, IonItem, IonLabel, IonCardSubtitle, IonListHeader, IonGrid, IonRow, IonCol, IonThumbnail, IonBadge, IonIcon, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,

  // Acá se importa las etiquetas especiales de Ionic que se estan usando
  imports: [ IonIcon, IonBadge, IonCol, IonRow, IonGrid, IonListHeader, IonCardSubtitle, IonLabel, IonItem, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonText, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonList, IonThumbnail]
})
export class InicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
