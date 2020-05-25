import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) { //añade un mensage a la caché
    this.messages.push(message);
  }

  clear() { //vacía la caché
    this.messages = [];
  }
}

//El servicio expone su caché para los mensajes, el de add y el de clear