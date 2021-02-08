import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private uploadService: UploadService) { }
  
  ngOnInit() {
  	this.showFiles();
  }

  uploadForm = new FormGroup({
  	file : new FormControl(''),
  });

  upload_success = false;
  submit_btn = false;
  onSubmit()
  {

  	if (this.fileToUpload) 
  	{
  		this.submit_btn = true;
  		
	 	return this.uploadService.uploadFile(this.fileToUpload)
	 	.subscribe((data : any)  => {
			this.upload_success = true;
			this.submit_btn = false;
			this.fileToUpload = null;
			this.resetUploadForm();
			this.showFiles();
	 	});
  	}
  }

  closeAlert()
  {
  	this.upload_success = false;
  }

  fileToUpload: File = null;
  handleFileInput(files: FileList)
  {
  	this.fileToUpload = files.item(0);
  }

  files = [];
  showFiles()
  {
	return this.uploadService.showFiles()
  	.subscribe((data : any)  => {
 		this.files = data;
 		console.log(this.files);
  	});
  }

  resetUploadForm()
  {
  	var resetForm = <HTMLFormElement>document.getElementById("file-upload-form");
  	resetForm.reset();
  }

}
