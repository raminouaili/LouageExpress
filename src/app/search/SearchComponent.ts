import {
  Component, CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit, ElementRef, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { Loader } from '@googlemaps/js-api-loader';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

declare global {
  interface Window { google: typeof google | undefined; }
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchComponent implements AfterViewInit {
  /* Template refs ------------------------------------------------*/
  @ViewChild('fromInput', { static: true }) fromInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toInput',   { static: true }) toInput!  : ElementRef<HTMLInputElement>;
  @ViewChild('travelDateInput', { static: true }) travelDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('returnDateInput') returnDateInput?: ElementRef<HTMLInputElement>;

  /* Autocomplete results ----------------------------------------*/
  public fromPlace: google.maps.places.PlaceResult | null = null;
  public toPlace  : google.maps.places.PlaceResult | null = null;

  /* UI state -----------------------------------------------------*/
  error: string | null = null;
  roundTrip = false;

  /* Google Map objects ------------------------------------------*/
  private map!: google.maps.Map;
  private fromMarker!: google.maps.Marker;
  private toMarker!: google.maps.Marker;
  private path!: google.maps.Polyline;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(private router: Router, private trips: TripService, private translate: TranslateService) {}

  /* ----------------------------------------------------------------
     1. Initialiser la carte et l’auto-complétion
  ---------------------------------------------------------------- */
ngAfterViewInit(): void {
    /* Charge Google Maps + Places avant d’appeler nos helpers */
    const loader = new Loader({
      apiKey   : 'AIzaSyDr0Yl2HkwW7OtBa5fyKtySeMuOMATpafc',
      version  : 'weekly',
      libraries: ['places']
    });

    loader.load()
      .then(() => {
        this.initMap();
        this.initAutocomplete();
      })
      .catch(() => this.error = this.translate.instant('search.errors.mapLoad'));
  }
  /* -------------------- Helpers ----------------------------------*/
  private initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      { center: { lat: 34, lng: 9 }, zoom: 6, mapTypeControl: false }
    );

    this.fromMarker = new google.maps.Marker({ map: this.map, visible: false });
    this.toMarker   = new google.maps.Marker({ map: this.map, visible: false });

    /* ➜ service + renderer pour l’itinéraire */
    this.directionsService  = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: true,       // on garde nos propres marqueurs
      polylineOptions: { strokeColor: '#EA4335', strokeWeight: 4 }
    });
  }


   private initAutocomplete(): void {
    const opts = { componentRestrictions: { country: 'tn' } } as google.maps.places.AutocompleteOptions;
    const fromAuto = new google.maps.places.Autocomplete(this.fromInput.nativeElement, opts);
    const toAuto   = new google.maps.places.Autocomplete(this.toInput.nativeElement,   opts);

    fromAuto.addListener('place_changed', () => {
      this.fromPlace = fromAuto.getPlace();
      this.updateMap();
    });
    toAuto.addListener('place_changed', () => {
      this.toPlace = toAuto.getPlace();
      this.updateMap();
    });
  }

  /** Vérifie que le lieu est vraiment en Tunisie (code pays = TN) */
  private isPlaceInTunisia(p: google.maps.places.PlaceResult | null): boolean {
    return !!p?.address_components?.some(c => c.short_name?.toLowerCase() === 'tn');
  }

  /** Met à jour marqueurs + ligne & ajuste le viewport */
  private updateMap(): void {
    /* Met à jour / affiche les marqueurs -------------------------- */
    if (this.fromPlace?.geometry?.location) {
      this.fromMarker.setPosition(this.fromPlace.geometry.location);
      this.fromMarker.setVisible(true);
    }
    if (this.toPlace?.geometry?.location) {
      this.toMarker.setPosition(this.toPlace.geometry.location);
      this.toMarker.setVisible(true);
    }

    /* Si les deux points sont définis, on demande l’itinéraire ---- */
    if (this.fromPlace?.geometry?.location && this.toPlace?.geometry?.location) {
      this.directionsService
        .route({
          origin:      this.fromPlace.geometry.location,
          destination: this.toPlace.geometry.location,
          travelMode:  google.maps.TravelMode.DRIVING
        })
        .then(res => {
          this.directionsRenderer.setDirections(res);
          /* Ajuste le viewport sur tout le parcours */
          this.map.fitBounds(res.routes[0].bounds!);
        })
        .catch(() => this.error = this.translate.instant('search.errors.route'));
    } else {
      /* Si on change un point et que l’autre est vide, on efface la ligne */
      this.directionsRenderer.set('directions', null);
    }
  }


  /* ----------------------------------------------------------------
     2. Soumission
  ---------------------------------------------------------------- */
  onSubmit(form: NgForm): void {
    const { from, to, travelDate, returnDate, passengers, roundTrip } = form.value;

    Object.values(form.controls).forEach(c => {
      c.setErrors(null);
      c.updateValueAndValidity();
    });

    let firstInvalid: HTMLElement | null = null;

    if (!this.isPlaceInTunisia(this.fromPlace)) {
      form.controls['from']?.setErrors({ invalidPlace: true });
      form.controls['from']?.markAsTouched();
      firstInvalid ??= this.fromInput.nativeElement;
    }

    if (!this.isPlaceInTunisia(this.toPlace)) {
      form.controls['to']?.setErrors({ invalidPlace: true });
      form.controls['to']?.markAsTouched();
      firstInvalid ??= this.toInput.nativeElement;
    }

    const dep = new Date(travelDate);
    const ret = returnDate ? new Date(returnDate) : null;
    const today = new Date(); today.setHours(0,0,0,0);

    if (dep < today) {
      form.controls['travelDate']?.setErrors({ pastDate: true });
      form.controls['travelDate']?.markAsTouched();
      firstInvalid ??= this.travelDateInput.nativeElement;
    }
    if (roundTrip && !ret) {
      form.controls['returnDate']?.setErrors({ required: true });
      form.controls['returnDate']?.markAsTouched();
      firstInvalid ??= this.returnDateInput?.nativeElement ?? null;
    } else if (roundTrip && ret && ret <= dep) {
      form.controls['returnDate']?.setErrors({ beforeDeparture: true });
      form.controls['returnDate']?.markAsTouched();
      firstInvalid ??= this.returnDateInput?.nativeElement ?? null;
    }

    if (form.invalid) {
      firstInvalid?.focus();
      return;
    }

    this.error = null;

    /* ---- Appel backend ---- */
    this.trips.searchTrips({
      fromPlaceId: this.fromPlace!.place_id!,
      toPlaceId:   this.toPlace!.place_id!,
      travelDate,
      returnDate: roundTrip ? returnDate : undefined,
      passengers: +passengers
    }).subscribe({
      next: trips => {
        /* On passe les critères en query params ; la page /results consultera l’API ou utilisera les trips reçus (à vous de voir) */
        this.router.navigate(['/results'], {
          queryParams: { from, to, travelDate, returnDate: roundTrip ? returnDate : undefined, passengers }
        });
      },
      error: () => this.error = this.translate.instant('search.errors.generic')
    });
  }
}
