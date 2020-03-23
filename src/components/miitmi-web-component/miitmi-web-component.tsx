import {
  Component,
  Prop,
  Host,
  h,
  State,
  Element, getAssetPath
} from '@stencil/core';

import 'web-social-share';

@Component({
  tag: 'miitmi-web-component',
  styleUrl: 'miitmi-web-component.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class MiitmiWebComponent {
  @Element() el: HTMLElement;

  @Prop() invite: string;

  @Prop() video: string;

  @State() videoChatUrl: string;
  @State() shareText: string;
  @State() titel: string;
  @State() shareData: any;


  async componentWillLoad() {
  // TODO  Interface bauen.. 

    /* STATES */
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

  private async share(): Promise<void> {
    // @ts-ignore
    if (navigator && navigator.share) {
      await this.shareMobile();
    } else {
      await this.shareDesktop();
    }
  }

  private async shareMobile() {
    const text: string = this.shareData.titel;
    const publishedUrl: string = this.shareData.url;

    // @ts-ignore
    await navigator.share({
      text: text,
      url: publishedUrl
    });
  }

  private shareDesktop() {
    return new Promise(async (resolve) => {
      const webSocialShare = this.el.shadowRoot.querySelector('web-social-share');

      if (!webSocialShare || !window) {
        return;
      }

      const publishedUrl: string = this.shareData.url;

      const shareOptions = {
        displayNames: true,
        config: [
          {
            twitter: {
              socialShareUrl: publishedUrl,
              socialSharePopupWidth: 300,
              socialSharePopupHeight: 400
            }
          },
          {
            facebook: {
              socialShareUrl: publishedUrl
            }
          },
          {
            whatsapp: {
              socialShareUrl: publishedUrl
            }
          },
          {
            linkedin: {
              socialShareUrl: publishedUrl
            }
          },
          {
            email: {
              socialShareBody: publishedUrl
            }
          },
          {
            copy: {
              socialShareUrl: publishedUrl
            }
          }
        ]
      };

      webSocialShare.share = shareOptions;

      webSocialShare.show = true;

      resolve();
    });
  }

  private clickVideoChat(): void{
      window.open(this.shareData.url);
  }

  render() {
    return (
      <Host>
        <button class="share" aria-label={this.invite} onClick={() => this.share()}>{ this.invite }</button>
        <button class="video" aria-labeel={this.video}  onClick={() => this.clickVideoChat()}> { this.video  }</button>

        <web-social-share show={false}>
          <img alt="Twitter" src={getAssetPath(`./assets/logo-twitter.svg`)} slot="twitter" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Facebook" src={getAssetPath(`./assets/logo-facebook.svg`)} slot="facebook" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Whatsapp" src={getAssetPath(`./assets/logo-whatsapp.svg`)} slot="whatsapp" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Linkedin" src={getAssetPath(`./assets/logo-linkedin.svg`)} slot="linkedin" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Mail" src={getAssetPath(`./assets/mail-outline.svg`)} slot="email" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Copy" src={getAssetPath(`./assets/copy-outline.svg`)} slot="copy" style={{'width': '1.6rem', display: 'block'}}/>
        </web-social-share>

      </Host>

    );
  }
}
