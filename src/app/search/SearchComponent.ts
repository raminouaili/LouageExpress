import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeApiService } from '../services/fake-api.service';

declare const google: any;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('fromInput', { static: true }) fromInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toInput', { static: true }) toInput!: ElementRef<HTMLInputElement>;

  private fromPlace: any;
  private toPlace: any;
  error: string | null = null;

  constructor(private router: Router, private api: FakeApiService) {}

  ngAfterViewInit(): void {
    const mapEl = document.getElementById('map') as HTMLElement;
    new google.maps.Map(mapEl, {
      center: { lat: 34.0, lng: 9.0 },
      zoom: 6,
    });

    const options = { componentRestrictions: { country: 'tn' } };
    const fromAuto = new google.maps.places.Autocomplete(
      this.fromInput.nativeElement,
      options
    );
    const toAuto = new google.maps.places.Autocomplete(
      this.toInput.nativeElement,
      options
    );
    fromAuto.addListener('place_changed', () => {
      this.fromPlace = fromAuto.getPlace();
    });
    toAuto.addListener('place_changed', () => {
      this.toPlace = toAuto.getPlace();
    });
  }

  private isPlaceInTunisia(place: any): boolean {
    return (
      place &&
      place.address_components?.some((c: any) => c.short_name?.toLowerCase() === 'tn')
    );
  }

  onSubmit(form: NgForm): void {
    const { from, to, travelDate, passengers } = form.value;

    const selected = new Date(travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      this.error = 'La date doit être future.';
      return;
    }

    if (!this.isPlaceInTunisia(this.fromPlace) || !this.isPlaceInTunisia(this.toPlace)) {
      this.error = 'Les lieux doivent être en Tunisie.';
      return;
    }

    this.error = null;
    this.api
      .searchTrips({ from, to, travelDate, passengers: Number(passengers) })
      .subscribe(() => {
        this.router.navigate(['/results'], {
          queryParams: { from, to, travelDate, passengers },
        });
      });
  }
}

