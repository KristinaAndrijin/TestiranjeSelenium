import { Injectable } from '@angular/core';
import { ReservationDTO, ReservationAccomodationDTO } from '../dtos/ReservationDTO';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  public listaAcc: ReservationAccomodationDTO[] = [
    {
      id:1,
      startDate: "15.02.2024.",
      endDate:"30.02.2024.",
      cancellationDeadline: "13.02.2024.",
      pricePerGuest: true,
      price: 50
    },
    {
      id:2,
      startDate: "15.03.2024.",
      endDate:"30.03.2024.",
      cancellationDeadline: "13.03.2024.",
      pricePerGuest: false,
      price: 500
    },
    {
      id:2,
      startDate: "15.03.2024.",
      endDate:"30.03.2024.",
      cancellationDeadline: "13.03.2024.",
      pricePerGuest: false,
      price: 500
    },
    {
      id:4,
      startDate: "15.05.2024.",
      endDate:"30.05.2024.",
      cancellationDeadline: "13.05.2024.",
      pricePerGuest: false,
      price: 600
    },
    {
      id:5,
      startDate: "15.06.2024.",
      endDate:"30.06.2024.",
      cancellationDeadline: "13.06.2024.",
      pricePerGuest: true,
      price: 70
    },
    {
      id:6,
      startDate: "15.07.2024.",
      endDate:"30.07.2024.",
      cancellationDeadline: "13.07.2024.",
      pricePerGuest: false,
      price: 700
    },
    {
      id:7,
      startDate: "15.08.2024.",
      endDate:"30.08.2024.",
      cancellationDeadline: "13.08.2024.",
      pricePerGuest: true,
      price: 80
    },
    {
      id:8,
      startDate: "15.09.2024.",
      endDate:"30.09.2024.",
      cancellationDeadline: "13.09.2024.",
      pricePerGuest: false,
      price: 800
    },
    {
      id:9,
      startDate: "15.10.2024.",
      endDate:"30.10.2024.",
      cancellationDeadline: "13.10.2024.",
      pricePerGuest: true,
      price: 60
    }
  ];

  public lista: ReservationDTO[] = [
    {
      id: 1,
      reservationStartDate: "15.02.2024.",
      reservationEndDate: "30.02.2024.",
      guestNum: 5,
      ReservationStatus: "ACCEPTED"
    },
    {
      id: 2,
      reservationStartDate: "15.03.2024.",
      reservationEndDate: "30.03.2024.",
      guestNum: 5,
      ReservationStatus: "ACCEPTED"
    },
    {
      id: 3,
      reservationStartDate: "15.04.2024.",
      reservationEndDate: "30.04.2024.",
      guestNum: 5,
      ReservationStatus: "CANCELLED"
    },
    {
      id: 4,
      reservationStartDate: "15.05.2024.",
      reservationEndDate: "30.05.2024.",
      guestNum: 5,
      ReservationStatus: "DECLINED"
    },
    {
      id: 5,
      reservationStartDate: "15.06.2024.",
      reservationEndDate: "30.06.2024.",
      guestNum: 5,
      ReservationStatus: "PENDING"
    }
  ];
}
