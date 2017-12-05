interface Video {
  url: string;
  duration: string;
  version: number;
}

export class Episode {

  title: string;
  video: Video;

  static load(data) {
    const e = new Episode();
    e.title = data.title;
    e.video = data.video;
    return e;
  }

}
