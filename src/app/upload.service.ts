import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  uploadUrl = '/api/store';
  showUrl = '/api/show';

  uploadFile(payload : File) {

  	const endpoint = this.uploadUrl;
  	const formData: FormData = new FormData();
  	formData.append('fileKey', payload, payload.name);

	let headers = new HttpHeaders({ 
    'Accept': 'application/json' });


  	return this.http
  	  .post(endpoint, formData, { headers: headers })
  	  .pipe(
  	  	catchError(this.handleError)
	  );
  	  // .map(() => { return true; });
  	  // .catch((e) => this.handleError(e));

  	console.log(payload)
    return this.http.post(this.uploadUrl, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  showFiles() { 
    return this.http.get(this.showUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) 
  {
  	console.log(error);
  	if (error.error instanceof ErrorEvent) {
  		// A client-side or network error occurred. Handle it accordingly.
  		console.error('An error occurred:', error.error.message);
  	} else {
  		// The backend returned an unsuccessful response code.
  		// The response body may contain clues as to what went wrong,
  		console.error(`Backend returned code ${error.status}, ` +`body was: ${error.error}`);
  	}
  	// return an observable with a user-facing error message
  	return throwError('Something bad happened; please try again later.');
  } 

}
