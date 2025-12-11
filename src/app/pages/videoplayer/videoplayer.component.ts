import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  imports: [RouterLink],
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent {

  videoUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const videoParam = this.route.snapshot.queryParamMap.get('video');

    if (!videoParam) return;

    // 🔥 Se for link com parâmetros, extrai só o ID
    let videoId = videoParam;

    if (videoParam.includes('youtu.be')) {
      videoId = videoParam.split('youtu.be/')[1].split('?')[0];
    }

    if (videoParam.includes('youtube.com/watch')) {
      const url = new URL(videoParam);
      videoId = url.searchParams.get('v') || videoId;
    }

    // 🔥 Monta URL segura para o iframe
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`
    );
  }

}
