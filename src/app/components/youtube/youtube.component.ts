import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeComponent implements OnInit {
  @Input() url: string;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  public get safeUrl(): SafeResourceUrl {
    const getQuerystring = (name, url) => {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      const results = regex.exec(url);
      if (!results) { return null; }
      if (!results[2]) { return ''; }
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const videoId = getQuerystring('v', this.url);
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(baseUrl);
  }
}
