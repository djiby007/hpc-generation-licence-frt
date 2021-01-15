import {CountryModel} from '../../country/models/country.model';
import {Status} from '../../enum/status.enum';

export interface CityModel{
  id: number;
  code: string;
  caption: string;
  country: CountryModel;
  status: Status;
}
