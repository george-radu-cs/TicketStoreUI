import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../pages/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  public isDialogOpen: Boolean = false;

  constructor(public dialog: MatDialog) {
  }

  public openDialog(data: { message: any, status: number }): void {
    this.isDialogOpen = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = window.innerWidth * 0.15 + 'px';
    dialogConfig.height = window.innerHeight * 0.15 + 'px';
    dialogConfig.data = data;
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(ErrorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
