import {CityModel} from '../../city/models/city.model';
import {Status} from '../../enum/status.enum';
import {TypeGeneriqueLogin} from '../../enum/typeGeneriqueLogin.enum';

export interface CompanyModel{
  id: number;
  code: string;
  socialReason: string;
  email: string;
  adress: string;
  phone: string;
  webSite: string;
  status: Status;
}
