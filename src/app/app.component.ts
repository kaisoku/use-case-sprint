import { Component, OnInit, ViewChild } from '@angular/core';
import { Signalement } from './signalement.model';
import { NgForm } from '@angular/forms';
import { SignalementService } from './signalement.service';
import { ObservationService } from './observation.service';
import { Observation } from './observation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('signalmentForm', { static: true }) siForm: NgForm;
  sexe = ['Homme', 'Femme', 'Non-binaire'];
  observations: Observation[] = [];
  selectedObservations = [];
  signalements: Signalement[] = [];
  error = null;
  isFetching = false;
  editMode = false;
  id: string;
  selectedSignalement: Signalement;
  minDate: Date = new Date(1923, 4, 23);

  ngOnInit(): void {
    this.isFetching = true;
    this.signalementService.fetchSignalements().subscribe({
      next: (signalements) => {
        this.isFetching = false;
        this.signalements = signalements;
      },
      error: (err) => {
        this.isFetching = false;
        this.error = err.message;
      },
    });

    this.obService.fetchObservations().subscribe({
      next: (observations) => {
        console.log(observations);
        this.observations = observations;
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }

  constructor(
    private signalementService: SignalementService,
    private obService: ObservationService
  ) {}

  onSubmit(signalementForm: NgForm) {
    if (!this.editMode) {
      const prenom = signalementForm.value.auteur.prenom;
      const nom = signalementForm.value.auteur.nom;
      const naissance = new Date(signalementForm.value.auteur.dateNaissance);
      const sexe = signalementForm.value.auteur.sexe;
      const email = signalementForm.value.auteur.email;
      const description = signalementForm.value.description;
      const obseervations: Observation[] = [
        { title: signalementForm.value.observations },
      ];
      this.signalementService
        .createSignalement(
          prenom,
          nom,
          naissance,
          sexe,
          email,
          description,
          obseervations
        )
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            this.error = error.message;
          },
        });
    } else if (this.editMode) {
      this.onUpdate();
    }
  }

  onFetchSignalements() {
    this.isFetching = true;
    this.signalementService.fetchSignalements().subscribe({
      next: (signalements) => {
        this.isFetching = false;
        this.signalements = signalements;
      },
      error: (err) => {
        this.isFetching = false;
        this.error = err.message;
      },
    });
  }

  onUpdate() {
    const prenom = this.siForm.value.auteur.prenom;
    const nom = this.siForm.value.auteur.nom;
    const naissance = new Date(this.siForm.value.auteur.dateNaissance);
    const sexe = this.siForm.value.auteur.sexe;
    const email = this.siForm.value.auteur.email;
    const description = this.siForm.value.description;
    const observations = [{ title: this.siForm.value.observations }];

    this.signalementService
      .updateSignalement(
        this.id,
        prenom,
        nom,
        naissance,
        sexe,
        email,
        description,
        observations
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.editMode = false;
          this.siForm.reset();
        },
        error: (err) => {
          this.error = err.message;
          this.editMode = false;
          this.siForm.reset();
        },
      });
  }

  onHandleError() {
    this.error = null;
  }

  onEditItem(index: string) {
    this.editMode = true;
    this.id = index;
    this.signalementService.fetchById(index).subscribe({
      next: (response) => {
        const date = new Date(response.naissance);
        this.siForm.form.patchValue({
          auteur: {
            prenom: response.prenom,
            nom: response.nom,
            dateNaissance:
              date.getFullYear().toString() +
              '-' +
              (date.getMonth() + 1).toString() +
              '-' +
              date.getDate().toString(),
            sexe: response.sexe,
            email: response.email,
          },
          description: response.description,
          observations: response.observations,
        });
      },
      error: (err) => (this.error = err.message),
    });
  }
}
