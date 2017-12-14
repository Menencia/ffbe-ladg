interface Video {
  yt: string;
  duration: string;
  version: number;
}

export class Episode {

  title: string;
  ref: string;
  region: string;
  isTown: boolean;
  video: Video;

  static load(data) {
    const e = new Episode();
    e.title = data.title;
    e.region = data.region;
    e.isTown = data.isTown;
    e.video = data.video;
    return e;
  }

  getID() {
    return this.ref.replace(/\//g, '-');
  }

  getTitle() {
    let string = '';
    const [number] = this.ref.split('/').slice(-1);
    string += '#' + number;
    if (this.title) {
      string += ' - ' + this.title;
    }
    return string;
  }

}
