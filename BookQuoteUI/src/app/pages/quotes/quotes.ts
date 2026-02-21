import { Component, OnInit } from '@angular/core';
import { Quote } from '../../shared/models/quote';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class Quotes implements OnInit {
  quote: Quote[] = [
    {
      id: 1,
      text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit',
      author: 'Aristotle',
    },
    {
      id: 2,
      text: 'A comfort zone is a beautiful place – but nothing ever grows there',
      author: 'James Clear',
    },
  ];

  quoteForm!: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      text: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  deleteQuote(id: number): void {
    this.quote = this.quote.filter((q) => q.id !== id);
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      const { text, author } = this.quoteForm.value;

      this.quote.push({
        id: Date.now(),
        text,
        author,
      });

      this.quoteForm.reset();
      this.showModal = false; // close the modal
    }
  }
}
