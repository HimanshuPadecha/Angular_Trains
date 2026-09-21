import { Component } from '@angular/core';
import { TraininfoBanner } from '../traininfo-banner/traininfo-banner';
import { PassagerForms } from '../passager-forms/passager-forms';
import { FareSummary } from '../fare-summary/fare-summary';
import { FooterDisclaimer } from '../footer-disclaimer/footer-disclaimer';

@Component({
  selector: 'app-passenger-fare',
  imports: [TraininfoBanner,PassagerForms,FareSummary,FooterDisclaimer],
  templateUrl: './passenger-fare.html',
  styleUrl: './passenger-fare.css',
})
export class PassengerFare {}
