import {OptionModel} from '../../option/models/option.model';
import {LicenceModel} from './licence.model';

export interface DetailsFacturationModel {
  id: number;
  nombre: number;
  montant: number;
  optionVente: OptionModel;
  licence: LicenceModel;
}
