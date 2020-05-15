import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
          CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  public photos: Photo[] =[];
  constructor() { }

  public async addNewPhoto(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
  }
  public async savePicture(cameraPhoto: CameraPhoto) {
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
    return {
      filepath: fileName,
      webviewPath:Capacitor.convertFileSrc(savedFile.uri)
    }
  }
  public async deletePicture(photoUri: string) {
    const deleted = await Filesystem.deleteFile({
      path: photoUri,
      directory: FilesystemDirectory.Data
    })
    return deleted;
  }
  public async readAsBase64(cameraPhoto: CameraPhoto){
    const file = await Filesystem.readFile({
      path: cameraPhoto.path
    });
    return file.data;
  }
  public async loadSavedPhoto(photoUri: string){
    const readFile = await Filesystem.readFile({
      path: photoUri,
      directory: FilesystemDirectory.Data
    })
    return readFile
  }

}
export interface Photo {
  path?: string;
  webPath?: string,
  base64?: string
}