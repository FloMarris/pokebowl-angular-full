import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ConnexionHttpService{

  constructor(private http: HttpClient) {
    this.load()
  }

}
