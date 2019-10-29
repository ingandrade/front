import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ToastrService } from 'ngx-toastr';
import { CountryDetail } from '../../services/country-detail.model';
import { Observable } from 'rxjs';
import { Department } from '../../services/department.model';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filterCountry = '';
  pageActual = 1;
  private countrys: CountryDetail;
  // countrys = [
  //   {
  //     depart: 'Atlantico',
  //     code: '005',
  //     name: 'Barranquilla'
  //   },
  //   {
  //     depart: 'Atlantico',
  //     code: '006',
  //     name: 'Barranquilla'
  //   },
  //   {
  //     depart: 'Atlantico',
  //     code: '007',
  //     name: 'Barranquilla'
  //   },
  //   {
  //     depart: 'Atlantico',
  //     code: '008',
  //     name: 'Barranquilla'
  //   }
  // ];
  closeResult: string;
  validatingForm: FormGroup;
  title = 'Crear Municipio';
  cr = false;

  dep: Observable<Department[]>;

  constructor(private modalService: NgbModal, private service: CountryService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList()
    .subscribe((countrys: CountryDetail ) => (this.countrys = countrys ));
    this.resetForm();
    this.getDep();
  }

  open(content, text, dat) {
    if (text === 1) {
      this.title = 'Create';
      this.resetForm();
      this.cr = true;
    } else {
      this.title = 'Edit';
      this.editCountry(dat);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getDep() {
    this.dep = this.service.getDepart();
    console.log(this.dep);
  }

  resetForm(form?: NgForm) {
    if ( form != null ) {
      form.resetForm();
    }
    this.service.formData = {
      CTId: 0,
      CountryCode: '',
      CountryName: '',
      DPId: '',
    };
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.service.formData.CTId === 0) {
      this.registerDat(form);
    } else {
      this.updateDat(form);
    }
  }

  editCountry(dat: CountryDetail) {
    this.service.formData = Object.assign({}, dat);
  }

  registerDat(form: NgForm) {
    this.service.postCountryDetail().subscribe(
      res => {
        this.resetForm(form);
        this.modalService.dismissAll();
        this.toastr.success('Country Successfully', 'Country Register');
        this.service.refreshList().subscribe((countrys: CountryDetail ) => (this.countrys = countrys ));
      },
      err => {
        console.log(err);
      }
    );
  }

  updateDat(form: NgForm) {
    this.service.putCountryDetail().subscribe(
      res => {
        this.resetForm(form);
        this.modalService.dismissAll();
        this.toastr.info('Country Successfully', 'Update Register');
        this.service.refreshList().subscribe((countrys: CountryDetail ) => (this.countrys = countrys ));
      },
      err => {
        console.log(err);
      }
    );
  }

  onDelete(CTId) {
    if (confirm('Are you sure to delete this record ?')){
      this.service.deletedCountryDetail(CTId)
      .subscribe(res => {
        this.modalService.dismissAll();
        this.toastr.warning('Country Successfully', 'Deleted Register');
        this.service.refreshList().subscribe((countrys: CountryDetail ) => (this.countrys = countrys ));
      },
        err => {
          console.log(err);
        });
    }
  }

}
