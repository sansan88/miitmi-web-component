import {
  Component,
  Prop,
  Host,
  h,
  State
} from '@stencil/core';


@Component({
  tag: 'miitmi-web-component',
  styleUrl: 'miitmi-web-component.css',
  //shadow: true,
})
export class MiitmiWebComponent {

  @Prop() invite: string;

  @Prop() video: string;

  @State() videoChatUrl: string;
  @State() shareText: string;
  @State() titel: string;
  @State() shareData: any;


  async componentWillLoad() {
    this.videoChatUrl = await this.getRandomChatUrl();
    this.shareText = "👋 treffe mich mit miitmii!";
    this.titel = "miitmi";

    this.shareData = {
      title: this.titel,
      text: this.shareText,
      url:  this.videoChatUrl,
    }

  }

  private getRandomChatUrl(): Promise < string > {
    return new Promise < string > (async (resolve) => {

      let random = Math.random().toString(36).substring(2);
      let url =  "https://meet.jit.si/miitmi-";

     resolve(url + random);
    });
  }


  private clickShare(): void{
    console.log("clickShare");
    navigator["share"](this.shareData );
  }


  private clickVideoChat(): void{
      console.log("clickVideoChat");
      location.href = this.videoChatUrl;

  }


  render() {

    return (

      <Host>
        <slot></slot>
        <button class="share"  onClick={() => this.clickShare()}>{ this.invite }</button> 
        <slot></slot>
        <button class="video"   onClick={() => this.clickVideoChat()}> { this.video  }</button> 
      </Host>

    );
  }
}
