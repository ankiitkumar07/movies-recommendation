import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  inject,
} from '@angular/core';

@Directive({
  selector: '[moviePoster]',
  standalone: true,
})
export class MoviePosterDirective implements OnChanges {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input('moviePoster') moviePoster!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.moviePoster) {
      // Set the background image style on the host element
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-image',
        `url(${this.moviePoster})`
      );
    }
  }
}
