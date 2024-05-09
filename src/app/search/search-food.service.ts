import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";
import { map, take, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class SearchFoodService {
    private foodList: any[] = [
        {
            id: "1",
            food: "food1",
            description: "foodddddddddddddddddddddddddddddddddddddd",
            keyword: ["food", "food1"],
            cooling_mode: "cool, cold",
        },
        {
            id: "2",
            food: "food2",
            description: "foodddddddddddddddddddddddddddddddddddddd",
            keyword: ["food", "food2"],
            cooling_mode: "cool, cold",
        },
        {
            id: "3",
            food: "food3",
            description: "foodddddddddddddddddddddddddddddddddddddd",
            keyword: ["food", "food3"],
            cooling_mode: "cool, cold",
        },
        {
            id: "4",
            food: "food4",
            description: "foodddddddddddddddddddddddddddddddddddddd",
            keyword: ["food", "food2"],
            cooling_mode: "cool, cold",
        },
        {
            id: "5",
            food: "food5",
            description: "foodddddddddddddddddddddddddddddddddddddd",
            keyword: ["food", "food3"],
            cooling_mode: "cool, cold",
        },
    ];

    // ReplaySubject for recent searches
    private listRecentSearch: BehaviorSubject<any[]> = new BehaviorSubject<
        any[]
    >([]);

    constructor() {
        // Initialize listRecentSearch from localStorage
        const recentSearchFromLocalStorage = JSON.parse(
            localStorage.getItem("recentSearch") || "[]"
        );
        this.listRecentSearch.next(recentSearchFromLocalStorage);
    }

    getFoodList(): Observable<any[]> {
        return of(this.foodList);
    }

    getFood(id: string): Observable<any> {
        return this.getFoodList().pipe(
            map((foodList) => foodList.find((food) => food.id === id))
        );
    }

    getDescription(id: string): Observable<string> {
        return this.getFood(id).pipe(map((food) => food.description));
    }

    setDesiredFood(desiredFood: any): Observable<any> {
        return of(desiredFood);
    }

    addRecentSearch(recentSearch: any): void {
        // Lấy giá trị hiện tại của ReplaySubject
        this.listRecentSearch.pipe(take(1)).subscribe((currentList) => {
            let updatedList: any[];

            if (currentList.length < 5) {
                // Nếu danh sách chưa đủ 5 phần tử, thêm vào bình thường
                updatedList = [recentSearch, ...currentList];
            } else {
                // Nếu đã đủ 5 phần tử, xóa phần tử đầu tiên và thêm mới vào cuối
                updatedList = [recentSearch, ...currentList.slice(0, 4)];
            }

            this.listRecentSearch.next(updatedList);

            // Lưu recent searches vào localStorage
            localStorage.setItem("recentSearch", JSON.stringify(updatedList));
        });
    }

    recentSearch(): Observable<any[]> {
        return this.listRecentSearch.asObservable();
    }

    searchFood(keyword: string): Observable<any[]> {
        return this.getFoodList().pipe(
            map((foodList) => {
                return foodList.filter((food) =>
                    food.keyword.includes(keyword)
                );
            })
        );
    }

    // Add more methods as needed
}
