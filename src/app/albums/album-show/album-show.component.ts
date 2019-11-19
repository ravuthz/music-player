import { Component, Input, OnInit } from '@angular/core';

import { Album } from '../album';
import { AlbumListComponent } from '../album-list/album-list.component';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-show',
  templateUrl: './album-show.component.html',
  styleUrls: ['./album-show.component.scss']
})
export class AlbumShowComponent implements OnInit {

  @Input() album: Album;

  constructor(private albumService: AlbumService, private listComponent: AlbumListComponent) { }

  ngOnInit() {
  }

  deleteAlbum() {
    this.albumService.delete(this.album.id)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }


}
