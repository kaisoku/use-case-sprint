# AngularUseCase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Description

Ce projet est un use case de cr&ation de signalements.

Il contient 3 fonctionnalités principales:

- Cr&ations de Signalement
- Lecture des signalements
- Modification des signalements

## Ma solution

Création d'un seul compoant pour simplifier les choses

Ajout de deux services afin de permettre la gestion des données des `observations` et des `signalements`

Utilisation de `template driven form` car celui-ci sied plus à cette solution.

Utilisations de `firebase realtime database` pour les tests de requêtes veers l'api.

Utilisation de bootstrap pour le css

Utilisation de Material UI pour le rendu.

## fonctionnement

Pour la création de solution saisir les données requises

Pour la lecture des données cliquer sur afficher les signalements ou recharger la page

Pour modifier un signalement, cliquez sur la card du signalement, les champs seront automatiquements remplis modifier le fichier et cliquee sur mettre à jour.

Vous devez avio=oir à votre disposition votre propre api pour effectuer les tests.
