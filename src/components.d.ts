/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MiitmiWebComponent {
        "chatname": string;
        "invite": string;
        "video": string;
    }
}
declare global {
    interface HTMLMiitmiWebComponentElement extends Components.MiitmiWebComponent, HTMLStencilElement {
    }
    var HTMLMiitmiWebComponentElement: {
        prototype: HTMLMiitmiWebComponentElement;
        new (): HTMLMiitmiWebComponentElement;
    };
    interface HTMLElementTagNameMap {
        "miitmi-web-component": HTMLMiitmiWebComponentElement;
    }
}
declare namespace LocalJSX {
    interface MiitmiWebComponent {
        "chatname"?: string;
        "invite"?: string;
        "video"?: string;
    }
    interface IntrinsicElements {
        "miitmi-web-component": MiitmiWebComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "miitmi-web-component": LocalJSX.MiitmiWebComponent & JSXBase.HTMLAttributes<HTMLMiitmiWebComponentElement>;
        }
    }
}
