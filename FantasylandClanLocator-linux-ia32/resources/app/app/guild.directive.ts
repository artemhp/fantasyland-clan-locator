import {Directive, ElementRef, Input, OnInit} from 'angular2/core';
@Directive({
  selector: '[guild]',
  inputs: ['testDirective: guild']
  // host: {
  //   '(mouseenter)': 'onMouseEnter()',
  //   '(mouseleave)': 'onMouseLeave()'
  // }
})
export class GuildDirective implements OnInit {
  private heroStyleClass;
  testDirective: any;
  constructor(private _el: ElementRef) {

    // if (this.heroStyle.style == '2') {
    //   this._el.className += " bold";
    // }
    // bold: hero.style == '2', italic: hero.style == '3', bolditalic: hero.style == '4'

  }
  ngOnInit(): any {
    console.log(this.testDirective);
    if (this.testDirective.style == '2') {
      this._el.nativeElement.className += " bold";
    } else if (this.testDirective.style == '3') {
      this._el.nativeElement.className += " bolditalic";
    }
    this._el.nativeElement.style.color = "#" + this.testDirective.color;
  }
  // onMouseEnter() { this._highlight("yellow"); }
  // onMouseLeave() { this._highlight(null); }

  // private _highlight(color: string) {
  //   this._el.style.backgroundColor = color;
  // }


}
