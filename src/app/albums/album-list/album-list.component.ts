import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatTable, MatSnackBar } from '@angular/material';
import { AlbumService } from '../album.service';
import { AlbumFormDialogComponent } from '../album-form-dialog/album-form-dialog.component';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'name', 'actions'];
  dataSource = [];

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(
    private albumService: AlbumService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData(filter = {}) {
    this.albumService.getFilter(filter).subscribe(res => {
      this.length = res.count || 0;
      this.dataSource = res.results || [];
    });
  }

  onPageEvent(event) {
    this.reloadData(event);
    return event;
  }

  onFilterEvent(name: string) {
    this.reloadData({ ...this.pageEvent, filterValue: { name__icontains: name } });
  }

  public openDialog(action, object) {
    object.action = action;

    const dialogRef = this.dialog.open(AlbumFormDialogComponent, {
      width: '450px',
      data: object
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadData();
    });
  }

}
