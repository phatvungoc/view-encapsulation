import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";
import { map, take, tap } from "rxjs/operators";

export const foodList: any[] = [
    {
        id: "1",
        food: "kimchi",
        description: "foodddddddddddddddddddddddddddddddddddddd",
        keyword: ["food", "food1"],
        cooling_mode: "cool, cold",
    },
    {
        id: "2",
        food: "orange",
        description: "foodddddddddddddddddddddddddddddddddddddd",
        keyword: ["2222", "222222"],
        cooling_mode: "cool, cold",
    },
    {
        id: "3",
        food: "apple",
        description: "foodddddddddddddddddddddddddddddddddddddd",
        keyword: ["3333333333", "33333"],
        cooling_mode: "cool, cold",
    },
    {
        id: "4",
        food: "banana",
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

@Injectable({
    providedIn: "root",
})
export class SearchFoodService {
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
        return of(foodList);
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

    fuzzySearch(query: string, threshold: number = 0.5): Observable<string[]> {
        return this.getFoodList().pipe(
            map((foodList) => {
                console.log("===wordList", foodList);
                const similarWords: string[] = [];
                for (const f of foodList) {
                    const word = f.food;
                    const distance = this.calculateLevenshteinDistance(
                        query,
                        word
                    );
                    const similarity =
                        1 - distance / Math.max(query.length, word.length);
                    if (similarity >= threshold) {
                        similarWords.push(word);
                    }
                }
                console.log("===similarWords", similarWords);
                return similarWords;
            })
        );
    }

    private calculateLevenshteinDistance(s1: string, s2: string): number {
        const len1 = s1.length;
        const len2 = s2.length;
        const matrix = [];

        for (let i = 0; i <= len1; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= len2; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        return matrix[len1][len2];
    }
}
