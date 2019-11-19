import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FileValidator } from 'ngx-material-file-input';

import { RepositoryService } from '../../shared/repository.service';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-form-dialog',
  templateUrl: './album-form-dialog.component.html',
  styleUrls: ['./album-form-dialog.component.scss']
})
export class AlbumFormDialogComponent implements OnInit {
  // 100 MB (=100 * 2 ** 20)
  readonly maxSize = 104857600;

  readonly actionLabels = {
    Add: 'Create',
    Edit: 'Update',
    Delete: 'Delete',
  };

  readonly actionFormTitles = {
    Add: 'Add New Album',
    Edit: 'Edit Old Album',
    Delete: 'Delete The Album',
  };

  public albumForm: FormGroup;
  public albumFormTitle = 'Create Album';
  public albumFormAction = 'Add';
  public albumFormButtonTitle = 'Create';

  public oldImage: string | any = '';

  constructor(
    // private location: Location,

    // already import MatSnackBarModule
    public snackBar: MatSnackBar,
    private repository: RepositoryService,
    private albumService: AlbumService,

    // no module import
    private dialogRef: MatDialogRef<AlbumFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    // @Inject(MAT_SNACK_BAR_DATA) public snackBarData: any,
  ) { }

  ngOnInit() {
    const name = this.dialogData.name || '';
    this.oldImage = this.dialogData.image || '';

    this.albumFormAction = this.dialogData.action || 'Add';

    this.albumFormTitle = this.actionFormTitles[this.albumFormAction];
    this.albumFormButtonTitle = this.actionLabels[this.albumFormAction];

    switch (this.albumFormAction) {
      case 'Add':
        this.albumForm = new FormGroup({
          name: new FormControl(name, [Validators.required, Validators.maxLength(60)]),
          image: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.maxSize)]),
        });
        break;

      default:
        this.albumForm = new FormGroup({
          name: new FormControl(name),
          image: new FormControl(''),
        });
    }
  }

  private handleError = (action, error) => {
    console.log('error: ', error);
    this.openSnackBar(`Error while trying to ${this.actionLabels[action]} albumn`);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.albumForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    // this.location.back();
    this.dialogRef.close();
  }

  public onSubmit = (formValue) => {
    // this.location.back();
    if (this.albumForm.valid) {
      console.log('onSubmit(formValue): ', formValue);

      const formData: any = new FormData();
      formData.append('name', formValue.name);

      if (formValue.image && formValue.image.files[0]) {
        formData.append('image', formValue.image.files[0]);
      }

      switch (this.albumFormAction) {
        case 'Edit':
          this.albumService.update(this.dialogData.id, formData)
            .subscribe(
              (data: any) => {
                this.dialogRef.close(formValue);
                this.openSnackBar(`The Album ${data.id} updated successfully`);
              },
              error => this.handleError(this.albumFormAction, error));
          break;

        case 'Delete':
          this.albumService.delete(this.dialogData.id)
            .subscribe(
              (data: any) => {
                this.dialogRef.close(formValue);
                this.openSnackBar(`The Album ${data.id} deleted successfully`);
              },
              error => this.handleError(this.albumFormAction, error));
          break;

        default:
          this.albumService.create(formData)
            .subscribe(
              (data: any) => {
                this.dialogRef.close(formValue);
                this.openSnackBar(`The Album ${data.id} created successfully`);
              },
              error => this.handleError(this.albumFormAction, error));
      }
    }
  }

  public onFileChange(event) {
    const file = event.target ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // data:image/jpeg;base64
      reader.onload = (onLoadEvent) => {
        this.oldImage = reader.result;
      };
    }
  }

  public openSnackBar(message, action = 'Close') {
    this.snackBar.open(message, action, {
      panelClass: 'notification-dialog',
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

}
