import { Component, ViewChild, ElementRef } from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    switchMap,
    tap,
} from "rxjs/operators";
import { SearchFoodService, foodList } from "./search-food.service";

@Component({
    selector: "app-search-food",
    templateUrl: "./search.component.html",
})
export class SearchComponent {
    @ViewChild("searchInput", { static: true }) searchInput!: ElementRef;
    searchResults: any[] = [];
    recentSearches$: Observable<any[]> = new Observable();

    constructor(public searchService: SearchFoodService) {}

    ngOnInit() {
        this.recentSearches$ = this.searchService.recentSearch();
    }

    get isSearching(): boolean {
        return this.searchInput.nativeElement.value.trim() !== "";
    }

    ngAfterViewInit() {
        fromEvent(this.searchInput.nativeElement, "input")
            .pipe(
                debounceTime(300), // Chờ 300ms sau mỗi lần nhập trước khi gửi yêu cầu tìm kiếm
                distinctUntilChanged(), // Chỉ gửi yêu cầu nếu giá trị nhập thay đổi so với lần trước
                tap(() => (this.searchResults = [])), // Xóa kết quả tìm kiếm khi bắt đầu tìm kiếm mới
                switchMap(() =>
                    this.searchService.searchFood(
                        this.searchInput.nativeElement.value
                    )
                ) // Gọi API tìm kiếm và chuyển đổi kết quả
            )
            .subscribe((results: string[]) => {
                this.searchResults = results;
            });
    }

    handleSearch(e: any) {
        console.log(e.value);
        this.searchService.fuzzySearch(e.value).subscribe((value) => {
            console.log("search===", value);
            this.searchResults = value;
        });
    }

    addFoodRecently(food: any) {
        this.searchService.addRecentSearch(food);
    }
}
