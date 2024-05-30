import { Injectable, ComponentRef } from "@angular/core";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { FoodComponent } from "./food.component";

@Injectable({
    providedIn: "root",
})
export class OverlayService {
    private overlayRef!: OverlayRef;
    private componentRef!: ComponentRef<FoodComponent>;

    constructor(private overlay: Overlay) {}

    public open(templatePortal: TemplatePortal) {
        console.log("===templatePortal", templatePortal);
        if (!this.overlayRef) {
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(document.getElementById("foodInput")!)
                .withPositions([
                    {
                        originX: "start",
                        originY: "bottom",
                        overlayX: "start",
                        overlayY: "bottom",
                    },
                ]);

            // Đặt lệch sang trái 10px

            const overlayRefConfig = {
                positionStrategy,
                hasBackdrop: true,
                backdropClass: "cdk-overlay-transparent-backdrop",
            };

            this.overlayRef = this.overlay.create(overlayRefConfig);

            this.overlayRef.attach(templatePortal);

            this.overlayRef
                .backdropClick()
                .subscribe(() => this.overlayRef.dispose());
        }
    }

    public close() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    }
}
