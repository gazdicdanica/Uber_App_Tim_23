import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Document } from '../../model/Document';
import { DriverService } from '../../services/driver/driver.service';

@Component({
  selector: 'app-driver-document',
  templateUrl: './driver-document.component.html',
  styleUrls: ['./driver-document.component.css']
})
export class DriverDocumentComponent implements OnInit{

  @Input() input!: string;

  base64: string = "";
  upload : boolean = false;

  constructor(private driverService: DriverService){}

  documentForm = new FormGroup({
    fileInput: new FormControl('')
  });

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.driverService.getDocuments().subscribe({
      next: (result) => {
        for(let x of result){
          console.log(x.name);
          if (x.name == this.input){
            this.base64 =  "data:image/png;base64," + x.documentImage;
            this.upload = true;
            break;
          }
        }
      }
    })
  }

  previewImage(input : any) : void{
    let file: File = input.files[0];
    let reader: FileReader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.base64 = e.target.result.replace(/(\r\n|\n|\r)/gm, "");
      this.upload = true;
      
    }
  }

  imageListener($event: any): void{
    this.previewImage($event.target);
    // this.updateDocument();
  }

  updateDocument() : void{
    const pic = this.documentForm.value.fileInput;
    let document : Document = new Document(this.input, this.base64.split(",")[1], 0);
    this.driverService.addDocument(document).subscribe({
      next : (res) => {
        console.log(res);
        
      }
    });
  }

}
