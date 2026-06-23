import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonItem, IonLabel, IonButton, IonTextarea, IonIcon, IonText, IonToast,
  IonInput, IonSearchbar, IonAlert, IonCheckbox
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGithub, paperPlane, trash } from 'ionicons/icons';

// Importamos la interfaz del modelo para el tipado estricto
import { Comentario } from '../../models/comentario.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [
    IonText, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule, IonMenuButton, ReactiveFormsModule,
    IonItem, IonLabel, IonTextarea, IonInput, IonSearchbar, IonAlert, IonToast, IonCheckbox
  ]
})
export class ContactoPage implements OnInit {
  // Inyección de dependencias moderna para formularios reactivos
  private formBuilder = inject(FormBuilder);

  // Propiedades de estado y controles reactivos
  wbcForm!: FormGroup;
  isToastOpen = false;
  toastMessage = '';
  toastColor = 'success'; // Controla el color dinámico del Toast (success/danger)
  comentariosGuardados: Comentario[] = [];
  textoBuscar: string = '';
  isAlertOpen = false; // Controla la apertura del cuadro de confirmación

  // Configuración base de la alerta de Ionic
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'alert-button-cancel'
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {} // Se sobreescribe dinámicamente en presentAlert()
    }
  ];

  constructor() {
    // Registro de iconos utilizados en la interfaz gráfica
    addIcons({ logoGithub, paperPlane, trash });
  }

  ngOnInit() {
    // Definimos las validaciones estrictas del formulario reactivo
    this.wbcForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      comentario: ['', [Validators.required, Validators.minLength(5)]]
    });

    // Cargamos comentarios previos si existen en el LocalStorage
    this.cargarComentarios();
  }

  /**
   * Carga los datos almacenados en LocalStorage y asegura que cada registro
   * cuente con la propiedad 'seleccionado' inicializada en false.
   */
  cargarComentarios() {
    const datosLocales = localStorage.getItem('wbc_comentarios');
    if (datosLocales) {
      const lista: Comentario[] = JSON.parse(datosLocales);
      this.comentariosGuardados = lista.map(item => ({
        ...item,
        seleccionado: !!item.seleccionado
      }));
    }
  }

  /**
   * Centraliza la persistencia en el almacenamiento local del navegador
   */
  guardarEnLocalStorage() {
    localStorage.setItem('wbc_comentarios', JSON.stringify(this.comentariosGuardados));
  }

  /**
   * Procesa el envío del formulario, inserta el nuevo registro y limpia los campos.
   */
  enviarFormulario() {
    if (this.wbcForm.valid) {
      const nuevoComentario: Comentario = {
        ...this.wbcForm.value,
        seleccionado: false // Por defecto inicia desmarcado
      };

      this.comentariosGuardados.push(nuevoComentario);
      this.guardarEnLocalStorage();

      this.toastColor = 'success';
      this.toastMessage = `¡Gracias ${nuevoComentario.nombre}! Comentario guardado localmente en el navegador.`;
      this.isToastOpen = true;

      this.wbcForm.reset();
    }
  }

  /**
   * Abre la alerta de confirmación solo si hay registros seleccionados.
   * Si no hay ninguno, muestra un Toast informativo.
   */
  presentAlert() {
    const seleccionados = this.cantidadSeleccionados;
    if (seleccionados === 0) {
      this.toastColor = 'warning';
      this.toastMessage = 'Debes seleccionar al menos un registro para eliminar.';
      this.isToastOpen = true;
      return;
    }
    this.alertButtons[1].handler = () => {
      this.eliminarSeleccionados();
    };

    this.isAlertOpen = true;
  }

  /**
   * Remueve únicamente los comentarios individuales que tengan 'seleccionado' en true.
   */
  eliminarSeleccionados() {
    const inicial = this.comentariosGuardados.length;
    // Nos quedamos sólo con los que NO están marcados
    this.comentariosGuardados = this.comentariosGuardados.filter(item => !item.seleccionado);
    const totalAAborrar = inicial - this.comentariosGuardados.length;

    this.guardarEnLocalStorage();
    this.textoBuscar = '';

    this.toastColor = 'danger';
    this.toastMessage = totalAAborrar === 1
      ? 'El registro seleccionado ha sido eliminado.'
      : `${totalAAborrar} registros seleccionados fueron eliminados.`;
    this.isToastOpen = true;
  }

  /**
   * Realiza un vaciado completo del historial local.
   * (Este método se conserva por si se necesita en el futuro, pero no se usa desde la alerta)
   */
  eliminarTodo() {
    localStorage.removeItem('wbc_comentarios');
    this.comentariosGuardados = [];
    this.textoBuscar = '';

    this.toastColor = 'danger';
    this.toastMessage = 'Historial de registros locales eliminado correctamente.';
    this.isToastOpen = true;
  }

  /**
   * Método invocado por la casilla maestra para marcar o desmarcar todos los registros a la vez.
   */
  seleccionarTodos(event: any) {
    const checked = event.detail.checked;
    this.comentariosGuardados.forEach(item => item.seleccionado = checked);
  }

  /**
   * Captura el flujo de caracteres escritos en la barra de búsqueda.
   */
  buscarComentario(event: any) {
    this.textoBuscar = event.detail.value || '';
  }

  /**
   * Getter que filtra reactivamente basándose en el input de búsqueda.
   */
  get comentariosFiltrados() {
    if (!this.textoBuscar.trim()) {
      return this.comentariosGuardados;
    }
    return this.comentariosGuardados.filter(item =>
      item.nombre.toLowerCase().includes(this.textoBuscar.toLowerCase()) ||
      item.comentario.toLowerCase().includes(this.textoBuscar.toLowerCase())
    );
  }

  /**
   * Getter computado que verifica si absolutamente todos los elementos están marcados.
   * Permite que la casilla maestra se desmarque sola si el usuario quita un checkbox a mano.
   */
  get todosSeleccionados(): boolean {
    if (this.comentariosGuardados.length === 0) return false;
    return this.comentariosGuardados.every(item => item.seleccionado);
  }

  /**
   * Getter que devuelve la cantidad de registros seleccionados.
   */
  get cantidadSeleccionados(): number {
    return this.comentariosGuardados.filter(item => item.seleccionado).length;
  }

  /**
   * Getter que construye el mensaje dinámico de la alerta de confirmación.
   */
  get mensajeAlerta(): string {
    const seleccionados = this.cantidadSeleccionados;
    return `¿Estás seguro de que deseas eliminar ${seleccionados} registros seleccionados?`;
  }
}
