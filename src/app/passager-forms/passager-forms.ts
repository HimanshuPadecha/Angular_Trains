import { Component } from '@angular/core';

@Component({
  selector: 'app-passager-forms',
  imports: [],
  templateUrl: './passager-forms.html',
  styleUrl: './passager-forms.css',
})
export class PassagerForms {
  pref = [
    { id: 'LOWER', icon: 'vertical_align_bottom', label: 'LOWER' },
    { id: 'MIDDLE', icon: 'reorder', label: 'MIDDLE' },
    { id: 'UPPER', icon: 'vertical_align_top', label: 'UPPER' },
    { id: 'SIDE L', icon: 'align_horizontal_left', label: 'SIDE L' },
    { id: 'SIDE U', icon: 'align_horizontal_right', label: 'SIDE U' }
  ]
}
