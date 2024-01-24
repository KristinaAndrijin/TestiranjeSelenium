import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDTO } from '../dtos/UserDTOs';

@Injectable()
export class UserdataServiceMock {
  constructor() { }

  getUsers(): Array<{}> {
      return [
          {
              name: 'user1',
              surname: 'usersurname1'
          }
      ];
  }

  getId() {
    return "1";
  }

  getUser(id: string):Observable<any> {
    let dto: UserDTO = {
        firstName: "Dusan",
        lastname: "Bibin",
        email: "mail@gmail.com",
        phoneNumber: "12344",
        address: "pakao",
    }
    return of(dto);
  }

  editUser(body: UserDTO):Observable<any>{
    return of(body);
  }
}