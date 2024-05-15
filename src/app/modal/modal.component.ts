import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

// @ts-ignore
const $: any = window['$'];
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @ViewChild('modal') modal?: ElementRef;

  title!: string;
  content!: string;
  actionButtonTitle!: string;
  activeActionButton: boolean = false;
  actionButtonCallback!: Function;

  open() {
    $(this.modal?.nativeElement).modal('show');
  }

  close() {
    $(this.modal?.nativeElement).modal('hide');
  }

}
