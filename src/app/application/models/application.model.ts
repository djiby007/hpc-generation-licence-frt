import {Status} from '../../enum/status.enum';

export interface ApplicationModel{
  id: number;
  code: string;
  nom: string;
  description: string;
  prix: number;
  nombreJour: number;
  status: Status;
}
