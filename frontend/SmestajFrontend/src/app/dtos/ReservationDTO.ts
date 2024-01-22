export interface ReservationDTO {
    id: number,
    reservationStartDate: string,
    reservationEndDate: string,
    guestNum: number,
    ReservationStatus: string;
}

export interface ReservationAccomodationDTO {
    id:number,
    startDate: string,
    endDate:string,
    cancellationDeadline: string;
    pricePerGuest:boolean,
    price: number
}
