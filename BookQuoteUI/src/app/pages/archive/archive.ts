import { Component, OnInit } from '@angular/core';
import { ArchiveService } from '../../shared/services/archive.service';
import { Book } from '../../shared/models/book';
import { Quote } from '../../shared/models/quote';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.html',
  styleUrls: ['./archive.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Archive implements OnInit {
  archivedItems: (Book | Quote)[] = [];
  filteredItems: (Book | Quote)[] = [];
  selectedFilter: 'all' | 'books' | 'quotes' = 'all';
  isLoading = true;

  constructor(private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.archivedItems = [
      {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publicationDate: new Date('2008-01-03'),
      },
      {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        publicationDate: new Date('2018-01-01'),
      },
      {
        id: 101,
        text: 'Be yourself; everyone else is already taken.',
        author: 'Oscar Wilde',
      },
      {
        id: 102,
        text: 'The journey of a thousand miles begins with one step.',
        author: 'Lao Tzu',
      },
    ];

    setTimeout(() => {
      this.applyFilter();
      this.isLoading = false;
    }, 500);
  }


  filterByType(type: 'all' | 'books' | 'quotes') {
    this.selectedFilter = type;
    this.applyFilter();
  }

  private applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredItems = [...this.archivedItems];
    } else if (this.selectedFilter === 'books') {
      this.filteredItems = this.archivedItems.filter((i) => 'title' in i);
    } else if (this.selectedFilter === 'quotes') {
      this.filteredItems = this.archivedItems.filter((i) => 'text' in i);
    }
  }

  parseDetails(item: Book | Quote) {
    return item;
  }
}
