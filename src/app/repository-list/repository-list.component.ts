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
  currentPage: number = 1;
  totalPages: number = 1;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;

  @Input() searchText = '';

  constructor(private http: HttpClient) { };
  
  ngOnChanges() {
    if (this.searchText.length !== 0) {
      this.getRepositories();
    }
    else {
      this.searchResultList = [];
    }
  }

  previousPage(){
    if (this.currentPage>1){
      this.currentPage--;
      this.getRepositories();
    }
  }

  nextPage(){
    this.currentPage++;
    this.getRepositories();
  }

  getRepositories(){
    this.http.get<SearchResults>(`https://api.github.com/search/repositories?q=${this.searchText}&per_page=10&page=${this.currentPage}`)
    .subscribe((response) => {
      this.searchResultList = response.items;
      let maxNumberOfPages = response.total_count/10;
      if (maxNumberOfPages > 100) {
        maxNumberOfPages = 100;
      }

      this.hasPreviousPage = this.currentPage > 1;
      this.hasNextPage = this.currentPage < maxNumberOfPages;
    });
  }
}
