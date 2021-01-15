import {ContinentModel} from '../../continent/models/continent.model';
import {Status} from '../../enum/status.enum';

export interface CountryModel{
  id: number;
  code: string;
  caption: string;
  continent: ContinentModel;
  status: Status;
}


