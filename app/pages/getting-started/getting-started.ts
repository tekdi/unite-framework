
import {Page, NavController, Loading} from 'ionic-angular';
import {ImageUpload} from '../../unite-framework/image-upload';

@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html',
})
export class GettingStartedPage {
    image: string;
    loading: any;
    progress: number=0;
    constructor(private imageupload: ImageUpload,
                private nav: NavController) { }
     // For multi select images
    // openAlbums = () : void => {
    //     this.plugins.albums.open().then((imgUrls) => {            
    //         imgUrls.forEach((imageUrl: string) : void => {
    //             if(imageUrl){                  
    //               this.images.push(imageUrl);
    //             }
    //         }); 
    //     });        
    // }
    
      // For single select image
    openAlbums = () : void => { 
        this.imageupload.albums.open().then((imageUrl) => { 
          if(imageUrl) {
            this.image = imageUrl;            
          }
      });
    }
    openCamera = () : void => { 
        this.imageupload.camera.open().then((imageUrl) => { 
          if(imageUrl) {
                 this.image = imageUrl;     
          }
      });
    }
      success = (result: any): void => {
        console.log(result);
        console.log("Redirecting");
        this.loading.dismiss();
    }

    failed = (err: any): void => {
       this.loading.dismiss();
        var code = err.code;
        console.log(err);
        alert("Failed to upload image. Code: " + code);
    }

    onProgress = (progressEvent: ProgressEvent): void => {
        if (progressEvent.lengthComputable) {
            var progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            this.setProgress(progress);
        }
    }

    setProgress = (progress: number): void => {
      this.progress = progress;
        console.log(progress);            
    }

    upload = (image: string): void => {
        console.log(image);
        this.loading = Loading.create({
            content: 'Please wait...'+ this.progress
        });
        this.nav.present(this.loading);
        this.imageupload.file.upload("http://172.132.45.153/joomla3.4_api/index.php?option=com_api&app=content&resource=upload&format=raw&lang=en&key=a2d3ca11a77374b296ef06a1e20a9ea4", image, this.success, this.failed, this.onProgress);
    }
    startUploading = () : void => {
       this.upload(this.image);
    }
 }
