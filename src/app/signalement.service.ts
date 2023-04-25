import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signalement } from './signalement.model';
import { Observable, map } from 'rxjs';
import { Observation } from './observation.model';

@Injectable({
  providedIn: 'root',
})
export class SignalementService {
  url =
    'https://angular-use-case-default-rtdb.firebaseio.com/signalements.json';
  constructor(private http: HttpClient) {}

  createSignalement(
    prenom: string,
    nom: string,
    naissance: Date,
    sexe: string,
    email: string,
    description: string,
    observations: Observation[]
  ) {
    const signalements: Signalement = {
      prenom,
      nom,
      naissance,
      sexe,
      email,
      description,
      observations,
    };
    return this.http.post(this.url, signalements);
  }

  fetchSignalements(): Observable<Signalement[]> {
    return this.http.get<{ [key: string]: Signalement }>(this.url).pipe(
      map((responseData) => {
        const signalementsArray: Signalement[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            signalementsArray.push({ ...responseData[key], id: key });
          }
        }
        return signalementsArray;
      })
    );
  }

  fetchById(id: string): Observable<Signalement> {
    return this.http
      .get<{ [key: string]: Signalement }>(this.url, {
        params: { id },
      })
      .pipe(
        map((responseData) => {
          let signalement: Signalement;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              signalement = { ...responseData[key], id: key };
            }
          }
          return signalement;
        })
      );
  }

  updateSignalement(
    id: string,
    prenom: string,
    nom: string,
    naissance: Date,
    sexe: string,
    email: string,
    description: string,
    observations: Observation[]
  ) {
    const signalements = {
      prenom,
      nom,
      naissance,
      sexe,
      email,
      description,
      observations,
    };
    return this.http.put(this.url, signalements, {
      params: { id },
    });
  }
}
