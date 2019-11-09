import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  files: any = [
    {
      url:
        // tslint:disable-next-line: max-line-length
        'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3',
      name: 'Perfect',
      artist: 'Ed Sheeran'
    },
    {
      url:
        // tslint:disable-next-line:max-line-length
        'https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3',
      name: 'Man Atkeya Beparwah',
      artist: 'Nusrat Fateh Ali Khan'
    },
    {
      url: 'https://music-api-256308.appspot.com/media/musics/Jes_tae_troam_troam_tov_thveu_mex_yreng_sro_lanh_ke_KqCfSUd.mp3',
      name: 'Jes tae troam troam tov thveu mex yeung sro lanh ke',
      artist: 'Khemarak Sereymon'
    }
  ];

  getFiles() {
    return of(this.files);
  }
}
