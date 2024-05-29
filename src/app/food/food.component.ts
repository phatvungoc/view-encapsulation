import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    Output,
    EventEmitter,
} from "@angular/core";
import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import { TemplatePortal, TemplatePortalDirective } from "@angular/cdk/portal";
import { OverlayService } from "./overlay.service";

@Component({
    selector: "app-food",
    templateUrl: "./food.component.html",
    styleUrls: ["./food.component.css"],
})
export class FoodComponent {
    @ViewChild("foodInput", { static: true }) foodInput!: ElementRef;
    @Output() outsideClick = new EventEmitter<void>();
    @ViewChild("foodList") foodList!: TemplatePortalDirective;
    foods = ["Pizza", "Burger", "Sushi", "Salad", "Pasta"];
    filteredFoods: string[] = [];
    showList = false;

    constructor(private overlayService: OverlayService) {}

    ngAfterViewInit() {
        document.addEventListener("click", this.onDocumentClick.bind(this));
    }

    ngOnDestroy() {
        document.removeEventListener("click", this.onDocumentClick.bind(this));
    }

    onInputChange(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();
        if (inputValue) {
            this.filteredFoods = this.foods.filter((food) =>
                food.toLowerCase().includes(inputValue)
            );
            this.showList = true;
            this.overlayService.open(this.foodList);
        } else {
            this.showList = false;
        }
    }

    onDocumentClick(event: Event) {
        const clickedInside = this.foodInput.nativeElement.contains(
            event.target
        );
        if (!clickedInside) {
            this.showList = false;
            this.overlayService.close();
        }
    }
}
