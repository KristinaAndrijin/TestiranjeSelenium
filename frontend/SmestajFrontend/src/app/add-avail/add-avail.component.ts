import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';
import { ReservationAccomodationDTO } from '../dtos/ReservationDTO';


@Component({
  selector: 'app-add-avail',
  templateUrl: './add-avail.component.html',
  styleUrls: ['./add-avail.component.css']
})
export class AddAvailComponent implements OnInit {

  constructor(private router: Router, private service: ReservationsService) { }

  accResForm!: FormGroup;
  isDisabled: boolean = true;
  id!: number;

  ngOnInit(): void {
    let res = this.service.getById(this.id);
    console.log(res);
    let b = 'perAcc';
    if (res?.pricePerGuest) {
      b = 'perGuest'
    } else {
      b = 'perAcc'
    }

    this.accResForm = new FormGroup({
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      deadline: new FormControl("", Validators.required),
      priceType: new FormControl("perAcc", Validators.required),
      price: new FormControl("", Validators.required),
      // validationType: new FormControl('', Validators.required),
      btn: new FormControl("")},
    );
  }

  add() {
    const currentDate = new Date();
    const startDate = new Date(this.accResForm.get('startDate')?.value);
    const endDate = new Date(this.accResForm.get('endDate')?.value);
    const deadline = new Date(this.accResForm.get('deadline')?.value);

    if (startDate <= currentDate || endDate <= currentDate || deadline <= currentDate) {
      alert('All dates should be in the future.');
      return;
    }

    if (startDate >= endDate) {
      alert('End Date should be after Start Date.');
      return;
    }

    if (deadline >= startDate) {
      alert('Start Date should be after Deadline.');
      return;
    }

    // All conditions met, you can proceed with further actions
    // alert('Dates are valid!');

    const startDate1 = (this.accResForm.get('startDate')?.value);
    const endDate1 = (this.accResForm.get('endDate')?.value);
    const deadline1 = (this.accResForm.get('deadline')?.value);
    const priceType = (this.accResForm.get('priceType')?.value);
    const price = (this.accResForm.get('price')?.value);

    let p = true;
    if (priceType == 'perAcc') {
      p = true;
    } else {
      p = false;
    }

    // console.log(startDate1, endDate1, deadline1) //priceType, price);
    // console.log(priceType);
    // console.log(price);

    let dto: ReservationAccomodationDTO = {
      id:this.id,
    startDate: this.changeAmerToSer(startDate1),
    endDate:this.changeAmerToSer(endDate1),
    cancellationDeadline: this.changeAmerToSer(deadline1),
    pricePerGuest:p,
    price: price
    }

    const random = this.getRandomInt();
    console.log(random);
    if (random > 5) {
      this.service.addAvail(dto);
      this.router.navigate(['edit'])
    }
    else {
      alert("Accomodation not available for chosen date");
    }
  }

  changeAmerToSer(date: string | undefined) {
    if (date != undefined) {
      let parts = date.split("-");
      let year = parts[0];
      let month = parts[1];
      let day = parts[2];
      let ser = day + "." + month + "." + year + ".";
      return ser;
    }
    return "";
  }

  changeSerToAmer(date: string | undefined) {
    if (date != undefined) {
      let parts = date.split(".");
      let year = parts[2];
      let month = parts[1];
      let day = parts[0];
      let amer = year + "-" + month + "-" + day;
      return amer;
    }
    return "";
  }

  getRandomInt() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  }

}
