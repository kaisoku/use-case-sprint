import { Observation } from './observation.model';

export interface Signalement {
  prenom: string;
  nom: string;
  naissance: Date;
  sexe: string;
  email: string;
  description: string;
  observations: Observation[];
  id?: string;
}
