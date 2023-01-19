import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-driver-document',
  templateUrl: './driver-document.component.html',
  styleUrls: ['./driver-document.component.css']
})
export class DriverDocumentComponent implements OnInit{

  @Input() input!: string;

  documentForm = new FormGroup({
    fileInput: new FormControl('')
  });

  ngOnInit(): void {
    console.log(this.input);
  }

  updateDocument() : void{
    
  }

}
