import {CompanyModel} from '../../company/models/company.model';
import {Status} from '../../enum/status.enum';
import {Civility} from '../../enum/civility.enum';
import {ProfileModel} from '../../profile/models/profile.model';
import {FilialeModel} from '../../filiale/models/filiale.model';

export interface UserModel{
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  filiale: FilialeModel;
  profile: ProfileModel;
  firstConnexion: boolean;
  civility: Civility;
  status: Status;
}
