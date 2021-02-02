import {DetailsFacturationModel} from './detailsFacturation.model';
import {LicenceModel} from './licence.model';

export interface LicenceDtoModel {
  licence: LicenceModel;
  detailsFacturation: DetailsFacturationModel;
}
