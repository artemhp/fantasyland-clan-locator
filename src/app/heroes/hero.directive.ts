import {Directive, ElementRef, Input, OnInit} from '@angular/core';
@Directive({
  selector: '[heroStyle]',
  inputs: ['testDirective: heroStyle']
})
export class HeroStyleDirective implements OnInit {
  private heroStyleClass;
  testDirective: any;
  constructor(private _el: ElementRef) {}
  ngOnInit(): any {
    if (this.testDirective.style == '2') {
      this._el.nativeElement.className += " bold";
    } else if (this.testDirective.style == '3') {
      this._el.nativeElement.className += " italic";
    } else if (this.testDirective.style == '4') {
      this._el.nativeElement.className += " bolditalic";
    }
    this._el.nativeElement.style.color = "#" + this.testDirective.color;
  }
}
