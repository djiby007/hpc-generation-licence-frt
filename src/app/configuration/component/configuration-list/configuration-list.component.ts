import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ConfigurationModel} from '../../models/configuration.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }
  listConfiguration: MatTableDataSource<ConfigurationModel>;
  displayColumns : string[]=['Status','Valeur Debut','Valeur Fin','Montant','Actions']

  ngOnInit(): void { this.refreshConfigList(); }

  refreshConfigList(){
    var dumpData = [{ status:'Actif',valeurDebut: '26700',valeurFin:'6000',montant:'20700'}]
    this.listConfiguration = new MatTableDataSource<ConfigurationModel>(dumpData);
  }

  onEditConfig(row){

  }

  onDeleteConfig(id){

  }

}
