import { Component, ViewContainerRef } from "@angular/core";
import { OverlayService } from "./overlay.service";

@Component({
    selector: "app-food",
    templateUrl: "./food.component.html",
    styleUrls: ["./food.component.css"],
})
export class FoodComponent {
    foods = ["Pizza", "Burger", "Sushi", "Salad", "Pasta"];
    filteredFoods: string[] = [];
    showList = false;

    constructor() {}

    onInputChange(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();
        if (inputValue) {
            this.filteredFoods = this.foods.filter((food) =>
                food.toLowerCase().includes(inputValue)
            );
        }
    }
}
