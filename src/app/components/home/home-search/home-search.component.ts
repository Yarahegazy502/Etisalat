import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    FormsModule,
  ],

  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent {
  @Output() handleSearchEmit = new EventEmitter();
  @Output() handleFilterTypeEmit = new EventEmitter();
  filterTypes: any = [
    { id: 1, name: 'Job Id' },
    { id: 2, name: 'Name' },
    { id: 3, name: 'Activites' },
  ];
  type: any;

  private searchSubject = new Subject<any>();
  isLoadingSearch: boolean = false;
  keyword: string = '';

  ngOnInit(): void {
    this.type = this.filterTypes[0];
    this.searchSubject.pipe(debounceTime(750)).subscribe(event => {
      this.searchService(event);
    });
  }

  onChangeFilter(): void {
    this.handleFilterTypeEmit.emit(this.type);
  }

  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }

  searchService(event: any): void {
    this.keyword = event;
    this.isLoadingSearch = true;
    this.handleSearchEmit.emit(this.keyword);
  }

  clearSearchValue(event: any): void {
    event.value = '';
    this.keyword = '';
    this.isLoadingSearch = true;
    this.handleSearchEmit.emit(this.keyword);
  }
}
