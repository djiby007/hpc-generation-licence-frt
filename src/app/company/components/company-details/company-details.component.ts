import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {Location} from '@angular/common';
import {CompanyModel} from '../../models/company.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: CompanyModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.companyService.findCompany(id).subscribe(value => this.company = value);
  }

  goBack() {
    this.location.back();
  }

}
