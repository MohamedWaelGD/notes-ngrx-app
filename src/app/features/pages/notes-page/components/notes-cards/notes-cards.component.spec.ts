import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCardsComponent } from './notes-cards.component';

describe('NotesCardsComponent', () => {
  let component: NotesCardsComponent;
  let fixture: ComponentFixture<NotesCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
