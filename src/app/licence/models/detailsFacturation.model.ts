import {OptionModel} from '../../option/models/option.model';
import {LicenceModel} from './licence.model';

export interface DetailsFacturationModel {
  id: number;
  nombre: number;
  montant: number;
  option: OptionModel;
  licence: LicenceModel;
}
