import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveService } from '../../shared/services/archive.service';
import { ArchiveLog } from '../../shared/models/archive-log';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive.html',
})
export class Archive implements OnInit {
  allItems: ArchiveLog[] = []; // store all logs
  items: ArchiveLog[] = []; // currently displayed logs

  selectedFilter: 'all' | 'books' | 'quotes' = 'all';
  isLoading = false;
  errorMessage = '';

  constructor(private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.archiveService.getAll().subscribe({
      next: (data: ArchiveLog[]) => {
        this.allItems = data;
        this.applyFilter(); 
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load archive';
        this.isLoading = false;
      },
    });
  }

  filterByType(type: 'all' | 'books' | 'quotes'): void {
    this.selectedFilter = type;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.items = this.allItems;
    } else if (this.selectedFilter === 'books') {
      this.items = this.allItems.filter((log) => log.entityType === 'Book');
    } else if (this.selectedFilter === 'quotes') {
      this.items = this.allItems.filter((log) => log.entityType === 'Quote');
    }
  }
  parseDetails(details: string): any {
    try {
      return JSON.parse(details);
    } catch {
      return {};
    }
  }
}