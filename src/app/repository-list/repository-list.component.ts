import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResults } from '../_models/search-results';
import { SearchResultItem } from '../_models/search-result-item';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css']
})

export class RepositoryListComponent implements OnChanges {
  searchResultList: SearchResultItem[] = [];

  @Input() searchText = '';

  constructor(private http: HttpClient) { };

  ngOnChanges() {
    if (this.searchText.length !== 0) {
      this.http.get<SearchResults>(`https://api.github.com/search/repositories?q=${this.searchText}&per_page=10`)
        .subscribe((response) => {
          this.searchResultList = response.items
          console.log(response.total_count)
        });
    }
    else {
      this.searchResultList = [];
    }
  }
}
