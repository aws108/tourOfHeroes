/*MessagesComponent debe mostrar todos los mensajes, incluido el mensaje enviado por
HeroService cuando se recupera héroes.*/

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service'; 

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public messageService: MessageService) {} //A

  ngOnInit(): void {
  }

}


/*A: Angular will inject the singleton MessageService into that property when it creates the
MessagesComponent. La propiedad messageService debe ser pública porque la vinculará en la plantilla.*/

