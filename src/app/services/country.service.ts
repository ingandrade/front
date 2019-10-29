import { Injectable } from '@angular/core';
import { CountryDetail } from './country-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  formData: CountryDetail;
  readonly rootURL = 'http://localhost:50594/api/';
  list: CountryDetail[];

  constructor(private http: HttpClient) { }

  postCountryDetail() {
    return this.http.post(this.rootURL + 'CountryDetail', this.formData);
  }

  putCountryDetail() {
    return this.http.put(this.rootURL + 'CountryDetail/' + this.formData.CTId, this.formData);
  }

  deletedCountryDetail(id) {
    return this.http.delete(this.rootURL + 'CountryDetail/' + id);
  }


  refreshList() {
    return this.http.get(this.rootURL + 'countryDetail');
    // .toPromise()
    // .then(res => this.list = res as CountryDetail[]) ;
  }

  getDepart() {
    return this.http.get<any[]>('/assets/data/departamentos.json');
  }
}
