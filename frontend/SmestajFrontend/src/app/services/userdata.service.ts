import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterResponseDTO, RegistrationDTO } from '../dtos/RegistrationDtos';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationRequestDTO, LoginResponse, LoginCreateCode,LoginSecondStepRequest } from '../dtos/LoginDtos';
import { UserDTO } from '../dtos/UserDTOs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http: HttpClient) {
   }

   registerUser(dto: RegistrationDTO):Observable<RegisterResponseDTO>{
    return this.http.post<RegisterResponseDTO>(environment.apiUrl+`v1/auth/register`,dto);
  }
  activateUser(activationId: string):Observable<any>{
    return this.http.get(environment.apiUrl+`v1/auth/activate/${activationId}`);
  }

  login(body: AuthenticationRequestDTO):Observable<LoginCreateCode>{
    return this.http.post<any>(`${environment.apiUrl}v1/auth/authenticate`, body);
  }

  getUser(id: string):Observable<any> {
    return this.http.get(environment.apiUrl+`user/${id}`);
  }

  editUser(body: UserDTO):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}user/`, body);
  }

}
