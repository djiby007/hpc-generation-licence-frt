import {FilialeModel} from '../../filiale/models/filiale.model';
import {StatusLicence} from '../../enum/statusLicence.enum';
import {ApplicationModel} from '../../application/models/application.model';

export interface LicenceModel {
  id: number;
  cle: string;
  description: string;
  montant: number;
  dateDebut: Date ;
  dateFin: Date ;
  duree: number;
  status: StatusLicence;
  application: ApplicationModel;
  filiale: FilialeModel;
}
