import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-food-list",
    template: `
        <div class="food-list" *ngIf="filteredFoods.length">
            <div *ngFor="let food of filteredFoods">{{ food }}</div>
        </div>
    `,
    styles: [
        `
            .food-list {
                background: white;
                border: 1px solid #ccc;
                padding: 10px;
                max-height: 300px;
                width: 300px;
                overflow-y: auto;
                border-radius: 1px solid #ccc;
            }
        `,
    ],
    standalone: true,
    imports: [CommonModule],
})
export class FoodListComponent {
    @Input({ required: true }) filteredFoods!: any;
}
