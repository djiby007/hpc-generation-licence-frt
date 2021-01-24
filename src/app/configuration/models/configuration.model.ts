import {OptionModel} from '../../option/models/option.model';

export interface ConfigurationModel{
  success: boolean;
  message: string;
  id: number;
  valeurDebut: number;
  valeurFin: number;
  montant: number;
  status: string;
  optionVente: OptionModel;
}
