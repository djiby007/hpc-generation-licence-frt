import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryModel} from '../../models/country.model';
import {CountryService} from '../../services/country.service';
import {CityService} from '../../../city/services/city.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  country: CountryModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.countryService.findCountry(id).subscribe(value => this.country = value);
  }

  goBack() {
    this.location.back();
  }

}
