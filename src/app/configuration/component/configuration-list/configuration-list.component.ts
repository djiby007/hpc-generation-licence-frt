import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ConfigurationModel} from '../../models/configuration.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfigurationCreateComponent} from '../configuration-create/configuration-create.component';
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private configService: ConfigurationService) { }

  listConfiguration: MatTableDataSource<ConfigurationModel>;
  displayColumns: string[] = ['Status', 'Valeur Debut', 'Valeur Fin', 'Montant', 'Actions'];
  successMessage: string;

  ngOnInit(): void { this.refreshConfigList(); }

  refreshConfigList(){
    this.configService.getConfigList().subscribe(data => {
        this.listConfiguration = new MatTableDataSource<ConfigurationModel>(data);
    });
  }

  onEditConfig(config: ConfigurationModel){
    console.log(config);
  }

  onDeleteConfig(config: ConfigurationModel){
    if (config.id){
      this.configService.deleteConfig(config.id, config).subscribe(response => {
        this.successMessage = response.message;
        alert(this.successMessage);
        this.refreshConfigList();
      });
    }
  }

  applyFilter(filterValue: string) {
    this.listConfiguration.filter = filterValue.trim().toLocaleLowerCase();
    console.log(filterValue);
  }

  onAdd() {
    const dialogConfiguration = new MatDialogConfig();
    dialogConfiguration.disableClose = true;
    dialogConfiguration.autoFocus = true;
    dialogConfiguration.width = '50%';
    this.dialog.open(ConfigurationCreateComponent, dialogConfiguration);
  }
}
