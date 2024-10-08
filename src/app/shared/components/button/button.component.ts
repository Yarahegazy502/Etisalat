import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() isDisabled: boolean = false;
  @Input() type: 'solid-main' | 'outline-main' = 'solid-main';

  @Output() buttonAction = new EventEmitter();

  clickBtn() {
    this.buttonAction.emit();
  }
}
