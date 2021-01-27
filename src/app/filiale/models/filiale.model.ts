
import {Status} from '../../enum/status.enum';
import {TypeGeneriqueLogin} from '../../enum/typeGeneriqueLogin.enum';

export interface FilialeModel {
  id: number;
  code: string;
  caption: string;
  email: string;
  adress: string;
  phone: string;
  webSite: string;
  status: Status;
  typeGeneriqueLogin: TypeGeneriqueLogin;
}
