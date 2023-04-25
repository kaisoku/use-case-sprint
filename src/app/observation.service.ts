import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Observation } from './observation.model';

@Injectable({
  providedIn: 'root',
})
export class ObservationService {
  constructor(private http: HttpClient) {}

  fetchObservations(): Observable<Observation[]> {
    return this.http
      .get<{ [key: string]: Observation }>(
        'https://angular-http-request-53c89-default-rtdb.europe-west1.firebasedatabase.app/observations.json'
      )
      .pipe(
        map((responseData) => {
          const observationsArray: Observation[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              observationsArray.push({ ...responseData[key], id: key });
            }
          }
          return observationsArray;
        })
      );
  }
}
