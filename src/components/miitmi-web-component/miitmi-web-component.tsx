import {
  Component,
  Prop,
  Host,
  h,
  State,
  Element
} from '@stencil/core';

import 'web-social-share';

@Component({
  tag: 'miitmi-web-component',
  styleUrl: 'miitmi-web-component.css',
  //shadow: true,
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
      const webSocialShare = this.el.querySelector('web-social-share');

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
            whatsapp: {
              socialShareUrl: publishedUrl
            }
          },
          {
            copy: {
              socialShareUrl: publishedUrl
            }
          },
          {
            hackernews: {
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

  // TODO: Replace web-social-share with effective icons
  // <ion-icon name="logo-twitter" slot="twitter" style={{color: '#00aced', 'font-size': '1.6rem', display: 'block'}}></ion-icon>
  // or
  // <i class="fab fa-reddit" slot="reddit" style="color: #cee3f8;"></ion-icon>

  render() {
    return (
      <Host>
        <slot></slot>
        <button class="share"  onClick={() => this.share()}>{ this.invite }</button>
        <slot></slot>
        <button class="video"   onClick={() => this.clickVideoChat()}> { this.video  }</button>

        <web-social-share show={false}>
          <ion-icon name="logo-twitter" slot="twitter" style={{color: '#00aced', 'font-size': '1.6rem', display: 'block'}}></ion-icon>
          <ion-icon name="logo-linkedin" slot="linkedin" style={{color: '#0077b5', 'font-size': '1.6rem', display: 'block'}}></ion-icon>
          <ion-icon name="mail-outline" slot="email" style={{color: 'var(--ion-color-tertiary)', 'font-size': '1.6rem', display: 'block'}}></ion-icon>
          <ion-icon name="logo-whatsapp" slot="whatsapp" style={{color: '#25D366', 'font-size': '1.6rem', display: 'block'}}></ion-icon>
          <ion-icon name="copy-outline" slot="copy" style={{'font-size': '1.6rem', display: 'block'}}></ion-icon>
          <ion-icon name="logo-hackernews" slot="hackernews" style={{color: '#ff6000', 'font-size': '1.6rem', display: 'block'}}></ion-icon>
        </web-social-share>

      </Host>

    );
  }
}


/*        <web-social-share show="true" style="--web-social-share-height: 140px; --web-social-share-target-width: 6rem;">
            <i class="fab fa-facebook" slot="facebook" ></i>
            <i class="fab fa-twitter" slot="twitter" ></i>

            <i class="fab fa-linkedin" slot="linkedin" ></i>

            <i class="fas fa-envelope" slot="email" ></i>
            <i class="fab fa-whatsapp-square" slot="whatsapp" ></i>

            <i class="far fa-copy" slot="copy" ></i>
        </web-social-share>
*/
