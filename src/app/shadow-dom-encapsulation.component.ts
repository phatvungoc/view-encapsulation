import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-shadow-dom-encapsulation",
    template: `
        <h2>ShadowDom</h2>
        <div class="shadow-message">Shadow DOM encapsulation</div>
        <app-emulated-encapsulation></app-emulated-encapsulation>
        <app-no-encapsulation></app-no-encapsulation>
    `,
    styles: [
        ".shadow-message { color: blue; }",
        " .none-message { color: yellow; }",
    ],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShadowDomEncapsulationComponent {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
