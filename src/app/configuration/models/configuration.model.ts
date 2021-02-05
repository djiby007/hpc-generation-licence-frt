import { OptionVentEditConfigModel } from '../../option/models/optionVentEditConfig.model';
import { ApplicationEditConfigModel } from '../../application/models/applicationEditConfig.model';

export interface ConfigurationModel{
  id: number;
  valeurDebut: number;
  valeurFin: number;
  montant: number;
  status: string;
  application: ApplicationEditConfigModel;
  optionVente: OptionVentEditConfigModel;
  success: boolean;
  message: string;
}
