interface Video {
  yt: string;
  duration: string;
  version: number;
}

export class EpisodeSE {

  title: string;
  ref: string;
  video: Video;

  static load(data) {
    const e = new EpisodeSE();
    e.title = data.title;
    e.video = data.video;
    return e;
  }

  getID() {
    return this.ref.replace(/\//g, '-');
  }

  getTitle() {
    let string = '';
    const [number] = this.ref.split('/').slice(-1);
    string += `#${number} - ${this.title}`;
    return string;
  }

}
