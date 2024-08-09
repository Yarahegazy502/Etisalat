import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  showGlobalLoader = new Subject<boolean>()

  constructor() { }

  clearValidationErrors(control: AbstractControl): void {
    control?.markAsPending();
  }
  validateAllFormFields(form: any): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field)
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
}
