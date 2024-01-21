import { Component, OnInit } from '@angular/core';
import { ReservationDTO } from '../dtos/ReservationDTO';


@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {

  constructor() {}

  lista: Array<ReservationDTO> = new Array<ReservationDTO>();

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.lista.push( {
        id: 1,
        reservationStartDate: "15.02.2024.",
        reservationEndDate: "30.02.2024.",
        guestNum: 5,
        ReservationStatus: "ACCEPTED"
      }
    );
    this.lista.push( {
      id: 2,
      reservationStartDate: "15.03.2024.",
      reservationEndDate: "30.03.2024.",
      guestNum: 5,
      ReservationStatus: "ACCEPTED"
    }
  );
    this.lista.push( {
      id: 3,
      reservationStartDate: "15.04.2024.",
      reservationEndDate: "30.04.2024.",
      guestNum: 5,
      ReservationStatus: "CANCELLED"
    }
  );
    this.lista.push( {
      id: 4,
      reservationStartDate: "15.05.2024.",
      reservationEndDate: "30.05.2024.",
      guestNum: 5,
      ReservationStatus: "DECLINED"
    }
    );
    this.lista.push( {
      id: 5,
      reservationStartDate: "15.06.2024.",
      reservationEndDate: "30.06.2024.",
      guestNum: 5,
      ReservationStatus: "PENDING"
    }
    );
  }

  cancel(id:number) {
    console.log("obrisano");
    this.lista = this.lista.filter(item => item.id !== id);
  }
}
