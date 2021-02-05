import {Component, OnInit, ViewChild} from '@angular/core';
import {FeatureModel} from '../../models/feature.model';
import {FeatureService} from '../../services/feature.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  listFeature: MatTableDataSource<FeatureModel>;
  featureColumns: string[] = [ 'Status', 'Code', 'Caption'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private featureService: FeatureService) {
    this.featureService.listen().subscribe( (f: any) => {
      this.refreshFeatureList();
    });
  }


  ngOnInit(): void {this.refreshFeatureList(); }

  refreshFeatureList(){
    this.featureService.getFeatureList().subscribe(data => {
      this.listFeature = new MatTableDataSource<FeatureModel>(data);
      this.listFeature.sort = this.sort;
      this.listFeature.paginator = this.paginator;
    });
  }

  applyFilterFeatures(filterValue: string) {
    this.listFeature.filter = filterValue.trim().toLocaleLowerCase();
  }
}
