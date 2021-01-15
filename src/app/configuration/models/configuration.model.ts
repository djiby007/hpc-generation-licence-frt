import {OptionModel} from '../../option/models/option.model';

export interface ConfigurationModel{
  id: number;
  valeurDebut: string;
  valeurFin: string;
  montant: string;
  status: string;
  optionVente: OptionModel;
}
