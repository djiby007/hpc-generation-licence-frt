import {FeatureModel} from 'src/app/feature/models/feature.model';
import {ProfileModel} from 'src/app/profile/models/profile.model';

export interface PermissionModel {
  id: number;
  totalControl: boolean;
  edit: boolean;
  write: boolean;
  read: boolean;
  delete: boolean;
  rout: string;
  profile: ProfileModel;
  feature: FeatureModel;
}
