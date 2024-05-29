import { Injectable, ComponentRef } from "@angular/core";
import {
    ConnectionPositionPair,
    Overlay,
    OverlayRef,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { FoodComponent } from "./food.component";
import { TemplatePortalDirective } from "@angular/cdk/portal";

@Injectable({
    providedIn: "root",
})
export class OverlayService {
    private overlayRef!: OverlayRef;
    private componentRef!: ComponentRef<FoodComponent>;

    constructor(private overlay: Overlay) {}

    public open(templatePortal: TemplatePortalDirective) {
        if (!this.overlayRef) {
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(document.getElementById("foodInput")!)
                .withPositions([
                    {
                        originX: "end",
                        originY: "bottom",
                        overlayX: "end",
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
