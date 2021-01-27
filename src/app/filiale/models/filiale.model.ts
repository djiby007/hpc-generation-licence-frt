import {CityModel} from '../../city/models/city.model';
import {Status} from '../../enum/status.enum';
import {TypeGeneriqueLogin} from '../../enum/typeGeneriqueLogin.enum';
import {CompanyModel} from "../../company/models/company.model";

export interface FilialeModel {
  id: number;
  code: string;
  caption: string;
  email: string;
  adress: string;
  phone: string;
  webSite: string;
  city: CityModel;
  company: CompanyModel;
  status: Status;
  typeGeneriqueLogin: TypeGeneriqueLogin;
}
