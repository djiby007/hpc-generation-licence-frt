import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OptionService} from '../../services/option.service';
import {OptionModel} from '../../models/option.model';
import {OptionCreateComponent} from '../option-create/option-create.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {OptionEditComponent} from '../option-edit/option-edit.component';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {
  listOptions: MatTableDataSource<OptionModel>;
  Columns: string[] = [ 'Status', 'Code', 'Caption', 'Actions' ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  successApiMessage: string;
  errorApiMessage: string;
  successStatus: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private optionService: OptionService) {
    this.optionService.listen().subscribe( (l: any) => {
      this.refreshOptionList();
    });
  }

  ngOnInit(): void { this.refreshOptionList(); }

  refreshOptionList(){
    this.optionService.getOptionList().subscribe(data => {
      this.listOptions = new MatTableDataSource<OptionModel>(data);
      this.listOptions.sort = this.sort;
      this.listOptions.paginator = this.paginator;
    });
  }

  onEditOption(opt: OptionModel){
    this.optionService.currentOption = opt;
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    this.dialog.open(OptionEditComponent, dialogOption);
  }

  onDeleteOption(option: OptionModel){
    if (option.id){
      this.optionService.deleteOption(option.id, option).subscribe(response => {
        this.successStatus = Boolean(response.success);
        this.successApiMessage = response.message;
        if (this.successStatus === true){
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        }else {
          this.errorApiMessage = response.message;
          this.snackbar.open(this.errorApiMessage .toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        }
        this.refreshOptionList();
      }, err => {
        console.log(err.message);
      });
    }
  }

  applyFilterOptions(filterValue: string) {
    this.listOptions.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAddOption() {
    const dialogOption = new MatDialogConfig();
    dialogOption.disableClose = true;
    dialogOption.autoFocus = true;
    dialogOption.width = '50%';
    dialogOption.panelClass = ['background-dialog'];
    this.dialog.open(OptionCreateComponent, dialogOption);
  }
}
