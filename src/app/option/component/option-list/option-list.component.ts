import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OptionService} from '../../services/option.service';
import {OptionModel} from '../../models/option.model';
import {OptionCreateComponent} from '../option-create/option-create.component';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listOptions: MatTableDataSource<OptionModel>;
  Columns: string[] = ['Status', 'Code', 'Caption', 'Actions'];
  successMessage: string;

  constructor(private dialog: MatDialog,
              private optionService: OptionService) { }

  ngOnInit(): void { this.refreshOptionList(); }

  refreshOptionList(){
    this.optionService.getOptionList().subscribe(data => {
      this.listOptions = new MatTableDataSource<OptionModel>(data);
    });
  }

  onEditOption(opt: OptionModel){
    console.log(opt);
  }

  onDeleteOption(option: OptionModel){
    if (option.id){
      this.optionService.deleteOption(option.id, option).subscribe(response => {
        this.successMessage = response.message;
        alert(this.successMessage);
        this.refreshOptionList();
      });
    }
  }

  applyFilterOptions(filterValue: string) {
    this.listOptions.filter = filterValue.trim().toLocaleLowerCase();
    console.log(filterValue);
  }

  onAddOption() {
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '70%';
    this.dialog.open(OptionCreateComponent, dialogOption);
  }
}
