import { Component, OnInit } from '@angular/core';
import { ReservationAccomodationDTO } from '../dtos/ReservationDTO';
import { ReservationsService } from '../services/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-accomodation',
  templateUrl: './edit-accomodation.component.html',
  styleUrls: ['./edit-accomodation.component.css']
})
export class EditAccomodationComponent implements OnInit {
  constructor(private service: ReservationsService, private router: Router) {}

  lista: Array<ReservationAccomodationDTO> = new Array<ReservationAccomodationDTO>();
    name:string= "Smestaj 1";
    address: string="Pakao";

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.lista = this.service.getAllAcc();
  }


  edit(id:number) {
    // console.log("obrisano");
    // this.lista = this.lista.filter(item => item.id !== id);
    console.log(this.service.getById(id));
    this.router.navigate(['edit-form'], { queryParams: { id: id } });
  }

  add() {
    this.router.navigate(['add-form']);
  }

}
