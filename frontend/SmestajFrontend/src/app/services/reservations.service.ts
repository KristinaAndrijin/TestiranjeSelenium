import { Injectable } from '@angular/core';
import { ReservationDTO, ReservationAccomodationDTO } from '../dtos/ReservationDTO';
import { DataServiceService } from './data-service.service';
import { getLista, setLista, getListaAcc, setListaAcc } from '../liste';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  // listaAcc = new Array<ReservationAccomodationDTO>();
  // lista = new Array<ReservationDTO>();
  constructor(private data: DataServiceService) { 
  }

  getAll(){
    return getLista();
  }

  getAllAcc() {
    return getListaAcc();
  }

  getById(id:number) {
    return getListaAcc().find(item => item.id == id);
  }

  deleteById(id: number) {
    let lista1 = getLista().filter(item => item.id != id);
    setLista(lista1);
  }

  updateAvailById(id: number, updatedAccommodation: ReservationAccomodationDTO): void {
    const currentAccList = getListaAcc();
    const updatedAccList = currentAccList.map(item => (item.id == id ? updatedAccommodation : item));
    setListaAcc(updatedAccList);
  }

  addAvail(newA: ReservationAccomodationDTO): void {
    let currentAccList = getListaAcc();
    currentAccList.push(newA);
    setListaAcc(currentAccList);
  }
}
