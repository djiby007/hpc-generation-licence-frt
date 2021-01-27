import {OptionVentEditConfigModel} from '../../option/models/optionVentEditConfig.model';

export interface ConfigurationModel{
  id: number;
  valeurDebut: number;
  valeurFin: number;
  montant: number;
  status: string;
  optionVente: OptionVentEditConfigModel;
  success: boolean;
  message: string;
}
