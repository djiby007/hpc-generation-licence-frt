import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CityModel} from '../../models/city.model';
import {CityService} from '../../services/city.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {
  city: CityModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityService: CityService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCity();
  }

  getCity(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.cityService.findCity(id).subscribe(value => this.city = value);
  }

  goBack() {
    this.location.back();
  }

}
