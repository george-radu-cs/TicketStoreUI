import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appButtonHighlight]'
})
export class ButtonHighlightDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('linear-gradient(315deg, #ad1deb 0%, #6e72fc 74%)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundImage = color;
  }
}
