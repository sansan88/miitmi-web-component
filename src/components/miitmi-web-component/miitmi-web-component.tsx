import {
  Component,
  Prop,
  Host,
  h,
  State
} from '@stencil/core';

import { Plugins } from '@capacitor/core';
const { Share, Browser } = Plugins;

import { WebSocialShare } from '../../../node_modules/web-social-share/dist/loader/index'

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


  private clickShare(): void{
    
    Share.share({
        title:  this.shareData.titel ,
        text: this.shareData.text,
        url: this.shareData.url,
        dialogTitle: 'Share with buddies'
      }).then(share=>{
        
      }).catch(error=>{
        console.log("error");

        //TODO: web-social-share

      });
  }

  private clickVideoChat(): void{
      Browser.open({ url: this.shareData.url, });
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <button class="share"  onClick={() => this.clickShare()}>{ this.invite }</button> 
        <slot></slot>
        <button class="video"   onClick={() => this.clickVideoChat()}> { this.video  }</button>

        <WebSocialShare show="true"></WebSocialShare>

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