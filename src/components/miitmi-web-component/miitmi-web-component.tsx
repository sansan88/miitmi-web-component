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
  shadow: true,
  assetsDirs: ['assets']
})
export class MiitmiWebComponent {
  @Element() el: HTMLElement;

  @Prop() invite: string;
  @Prop() video: string;
  @Prop() chatname: string;

  @State() videoChatUrl: string;
  @State() shareText: string;
  @State() titel: string;
  @State() shareData: any;


  async componentWillLoad() {
  // TODO  Interface bauen.. 

    /* STATES */
    if (this.chatname){
      this.videoChatUrl = "https://meet.jit.si/" + this.chatname;
    }else{
      this.videoChatUrl = await this.getRandomChatUrl();
    }

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
          <img alt="Twitter" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1MTInIGhlaWdodD0nNTEyJyB2aWV3Qm94PScwIDAgNTEyIDUxMic+PHRpdGxlPmlvbmljb25zLXY1X2xvZ29zPC90aXRsZT48cGF0aCBmaWxsPSIjMDBhY2VkIiBkPSdNNDk2LDEwOS41YTIwMS44LDIwMS44LDAsMCwxLTU2LjU1LDE1LjMsOTcuNTEsOTcuNTEsMCwwLDAsNDMuMzMtNTMuNiwxOTcuNzQsMTk3Ljc0LDAsMCwxLTYyLjU2LDIzLjVBOTkuMTQsOTkuMTQsMCwwLDAsMzQ4LjMxLDY0Yy01NC40MiwwLTk4LjQ2LDQzLjQtOTguNDYsOTYuOWE5My4yMSw5My4yMSwwLDAsMCwyLjU0LDIyLjEsMjgwLjcsMjgwLjcsMCwwLDEtMjAzLTEwMS4zQTk1LjY5LDk1LjY5LDAsMCwwLDM2LDEzMC40QzM2LDE2NCw1My41MywxOTMuNyw4MCwyMTEuMUE5Ny41LDk3LjUsMCwwLDEsMzUuMjIsMTk5djEuMmMwLDQ3LDM0LDg2LjEsNzksOTVhMTAwLjc2LDEwMC43NiwwLDAsMS0yNS45NCwzLjQsOTQuMzgsOTQuMzgsMCwwLDEtMTguNTEtMS44YzEyLjUxLDM4LjUsNDguOTIsNjYuNSw5Mi4wNSw2Ny4zQTE5OS41OSwxOTkuNTksMCwwLDEsMzkuNSw0MDUuNiwyMDMsMjAzLDAsMCwxLDE2LDQwNC4yLDI3OC42OCwyNzguNjgsMCwwLDAsMTY2Ljc0LDQ0OGMxODEuMzYsMCwyODAuNDQtMTQ3LjcsMjgwLjQ0LTI3NS44LDAtNC4yLS4xMS04LjQtLjMxLTEyLjVBMTk4LjQ4LDE5OC40OCwwLDAsMCw0OTYsMTA5LjVaJy8+PC9zdmc+Cg==" slot="twitter" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Facebook" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1MTInIGhlaWdodD0nNTEyJyB2aWV3Qm94PScwIDAgNTEyIDUxMic+PHRpdGxlPmlvbmljb25zLXY1X2xvZ29zPC90aXRsZT48cGF0aCBmaWxsPSIjM2I1OTk4IiBkPSdNNDU1LjI3LDMySDU2LjczQTI0Ljc0LDI0Ljc0LDAsMCwwLDMyLDU2LjczVjQ1NS4yN0EyNC43NCwyNC43NCwwLDAsMCw1Ni43Myw0ODBIMjU2VjMwNEgyMDIuNDVWMjQwSDI1NlYxODljMC01Ny44Niw0MC4xMy04OS4zNiw5MS44Mi04OS4zNiwyNC43MywwLDUxLjMzLDEuODYsNTcuNTEsMi42OHY2MC40M0gzNjQuMTVjLTI4LjEyLDAtMzMuNDgsMTMuMy0zMy40OCwzMi45VjI0MGg2N2wtOC43NSw2NEgzMzAuNjdWNDgwaDEyNC42QTI0Ljc0LDI0Ljc0LDAsMCwwLDQ4MCw0NTUuMjdWNTYuNzNBMjQuNzQsMjQuNzQsMCwwLDAsNDU1LjI3LDMyWicvPjwvc3ZnPg==" slot="facebook" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Whatsapp" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1MTInIGhlaWdodD0nNTEyJyB2aWV3Qm94PScwIDAgNTEyIDUxMic+PHRpdGxlPmlvbmljb25zLXY1X2xvZ29zPC90aXRsZT48cGF0aCBmaWxsPSIjMjVEMzY2IiBkPSdNNDE0LjczLDk3LjFBMjIyLjE0LDIyMi4xNCwwLDAsMCwyNTYuOTQsMzJDMTM0LDMyLDMzLjkyLDEzMS41OCwzMy44NywyNTRBMjIwLjYxLDIyMC42MSwwLDAsMCw2My42NSwzNjVMMzIsNDgwbDExOC4yNS0zMC44N2EyMjMuNjMsMjIzLjYzLDAsMCwwLDEwNi42LDI3aC4wOWMxMjIuOTMsMCwyMjMtOTkuNTksMjIzLjA2LTIyMkEyMjAuMTgsMjIwLjE4LDAsMCwwLDQxNC43Myw5Ny4xWk0yNTYuOTQsNDM4LjY2aC0uMDhhMTg1Ljc1LDE4NS43NSwwLDAsMS05NC4zNi0yNS43MmwtNi43Ny00TDg1LjU2LDQyNy4yNmwxOC43My02OC4wOS00LjQxLTdBMTgzLjQ2LDE4My40NiwwLDAsMSw3MS41MywyNTRjMC0xMDEuNzMsODMuMjEtMTg0LjUsMTg1LjQ4LTE4NC41QTE4NSwxODUsMCwwLDEsNDQyLjM0LDI1NC4xNEM0NDIuMywzNTUuODgsMzU5LjEzLDQzOC42NiwyNTYuOTQsNDM4LjY2Wk0zNTguNjMsMzAwLjQ3Yy01LjU3LTIuNzgtMzMtMTYuMi0zOC4wOC0xOC4wNXMtOC44My0yLjc4LTEyLjU0LDIuNzgtMTQuNCwxOC0xNy42NSwyMS43NS02LjUsNC4xNi0xMi4wNywxLjM4LTIzLjU0LTguNjMtNDQuODMtMjcuNTNjLTE2LjU3LTE0LjcxLTI3Ljc1LTMyLjg3LTMxLTM4LjQycy0uMzUtOC41NiwyLjQ0LTExLjMyYzIuNTEtMi40OSw1LjU3LTYuNDgsOC4zNi05LjcyczMuNzItNS41Niw1LjU3LTkuMjYuOTMtNi45NC0uNDYtOS43MS0xMi41NC0zMC4wOC0xNy4xOC00MS4xOWMtNC41My0xMC44Mi05LjEyLTkuMzUtMTIuNTQtOS41Mi0zLjI1LS4xNi03LS4yLTEwLjY5LS4yYTIwLjUzLDIwLjUzLDAsMCwwLTE0Ljg2LDYuOTRjLTUuMTEsNS41Ni0xOS41MSwxOS0xOS41MSw0Ni4yOHMyMCw1My42OCwyMi43Niw1Ny4zOCwzOS4zLDU5LjczLDk1LjIxLDgzLjc2YTMyMy4xMSwzMjMuMTEsMCwwLDAsMzEuNzgsMTEuNjhjMTMuMzUsNC4yMiwyNS41LDMuNjMsMzUuMSwyLjIsMTAuNzEtMS41OSwzMy0xMy40MiwzNy42My0yNi4zOHM0LjY0LTI0LjA2LDMuMjUtMjYuMzdTMzY0LjIxLDMwMy4yNCwzNTguNjMsMzAwLjQ3Wicgc3R5bGU9J2ZpbGwtcnVsZTpldmVub2RkJy8+PC9zdmc+Cg==" slot="whatsapp" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Linkedin" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1MTInIGhlaWdodD0nNTEyJyB2aWV3Qm94PScwIDAgNTEyIDUxMic+PHRpdGxlPmlvbmljb25zLXY1X2xvZ29zPC90aXRsZT48cGF0aCBmaWxsPSIjMDA3N2I1IiBkPSdNNDQ0LjE3LDMySDcwLjI4QzQ5Ljg1LDMyLDMyLDQ2LjcsMzIsNjYuODlWNDQxLjYxQzMyLDQ2MS45MSw0OS44NSw0ODAsNzAuMjgsNDgwSDQ0NC4wNkM0NjQuNiw0ODAsNDgwLDQ2MS43OSw0ODAsNDQxLjYxVjY2Ljg5QzQ4MC4xMiw0Ni43LDQ2NC42LDMyLDQ0NC4xNywzMlpNMTcwLjg3LDQwNS40M0gxMDYuNjlWMjA1Ljg4aDY0LjE4Wk0xNDEsMTc1LjU0aC0uNDZjLTIwLjU0LDAtMzMuODQtMTUuMjktMzMuODQtMzQuNDMsMC0xOS40OSwxMy42NS0zNC40MiwzNC42NS0zNC40MnMzMy44NSwxNC44MiwzNC4zMSwzNC40MkMxNzUuNjUsMTYwLjI1LDE2Mi4zNSwxNzUuNTQsMTQxLDE3NS41NFpNNDA1LjQzLDQwNS40M0gzNDEuMjVWMjk2LjMyYzAtMjYuMTQtOS4zNC00NC0zMi41Ni00NC0xNy43NCwwLTI4LjI0LDEyLTMyLjkxLDIzLjY5LTEuNzUsNC4yLTIuMjIsOS45Mi0yLjIyLDE1Ljc2VjQwNS40M0gyMDkuMzhWMjA1Ljg4aDY0LjE4djI3Ljc3YzkuMzQtMTMuMywyMy45My0zMi40NCw1Ny44OC0zMi40NCw0Mi4xMywwLDc0LDI3Ljc3LDc0LDg3LjY0WicvPjwvc3ZnPgo=" slot="linkedin" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Mail" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1MTInIGhlaWdodD0nNTEyJyB2aWV3Qm94PScwIDAgNTEyIDUxMic+PHRpdGxlPmlvbmljb25zLXY1LW88L3RpdGxlPjxyZWN0IHg9JzQ4JyB5PSc5Nicgd2lkdGg9JzQxNicgaGVpZ2h0PSczMjAnIHJ4PSc0MCcgcnk9JzQwJyBzdHlsZT0nZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzJweCcvPjxwb2x5bGluZSBwb2ludHM9JzExMiAxNjAgMjU2IDI3MiA0MDAgMTYwJyBzdHlsZT0nZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzJweCcvPjwvc3ZnPg==" slot="email" style={{'width': '1.6rem', display: 'block'}}/>
          <img alt="Copy" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1MTInIGhlaWdodD0nNTEyJyB2aWV3Qm94PScwIDAgNTEyIDUxMic+PHRpdGxlPmlvbmljb25zLXY1LWU8L3RpdGxlPjxyZWN0IHg9JzEyOCcgeT0nMTI4JyB3aWR0aD0nMzM2JyBoZWlnaHQ9JzMzNicgcng9JzU3JyByeT0nNTcnIHN0eWxlPSdmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDozMnB4Jy8+PHBhdGggZD0nTTM4My41LDEyOGwuNS0yNGE1Ni4xNiw1Ni4xNiwwLDAsMC01Ni01NkgxMTJhNjQuMTksNjQuMTksMCwwLDAtNjQsNjRWMzI4YTU2LjE2LDU2LjE2LDAsMCwwLDU2LDU2aDI0JyBzdHlsZT0nZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzJweCcvPjwvc3ZnPg==" slot="copy" style={{'width': '1.6rem', display: 'block'}}/>
        </web-social-share>

      </Host>

    );
  }
}
