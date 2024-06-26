import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NoEncapsulationComponent } from "./no-encapsulation.component";
import { ShadowDomEncapsulationComponent } from "./shadow-dom-encapsulation.component";
import { EmulatedEncapsulationComponent } from "./emulated-encapsulation.component";
import { SearchComponent } from "./search/search.component";
import { FormsModule } from "@angular/forms";
import { FoodComponent } from "./food/food.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { OverlayService } from "./food/overlay.service";
import { FoodListComponent } from "./food/food-list.component";

@NgModule({
    declarations: [
        AppComponent,
        NoEncapsulationComponent,
        ShadowDomEncapsulationComponent,
        EmulatedEncapsulationComponent,
        SearchComponent,
        FoodComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        OverlayModule,
        PortalModule,
        FoodListComponent,
    ],
    providers: [OverlayService],
    bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
