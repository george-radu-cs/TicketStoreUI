import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appRedirectError]'
})
export class RedirectErrorDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#E0FFFF');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#ffffff');
  }

  private highlight(bgColor: string) {
    this.el.nativeElement.style.backgroundColor = bgColor;
  }
}
