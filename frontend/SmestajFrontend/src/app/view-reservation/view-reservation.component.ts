import { Component, OnInit } from '@angular/core';
import { ReservationDTO } from '../dtos/ReservationDTO';
import { ReservationsService } from '../services/reservations.service';


@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {

  constructor(private service: ReservationsService) {}

  lista: Array<ReservationDTO> = new Array<ReservationDTO>();

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.lista = this.service.getAll();
  }

  cancel(id:number) {
    console.log("obrisano");
    // this.lista = this.lista.filter(item => item.id !== id);
    this.service.deleteById(id);
    this.getAll();
  }
}
