import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vehicle-image[vehicleImageSrc]',
  templateUrl: './vehicle-image.component.html',
  styleUrls: ['./vehicle-image.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleImageComponent {
  @Input() vehicleImageSrc = '';
}
