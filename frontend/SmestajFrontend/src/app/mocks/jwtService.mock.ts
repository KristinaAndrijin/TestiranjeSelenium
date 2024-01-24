import { Injectable } from '@angular/core';

@Injectable()
export class JwtServiceMock {
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
}