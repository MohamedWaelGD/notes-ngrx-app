import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNotePageComponent } from './modify-note-page.component';

describe('ModifyNotePageComponent', () => {
  let component: ModifyNotePageComponent;
  let fixture: ComponentFixture<ModifyNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNotePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
