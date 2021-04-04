import { Inject, OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  constructor(private routeService: RouterService,
    private notesService: NotesService, private matDialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.note);
  }

  ngOnDestroy() {
    this.routeService.routeBack();
  }

  onSave() {
    this.notesService.editNote(this.note).subscribe((editedNote) => {
      this.matDialogRef.close();
    },
      (err: any) => {
        this.errMessage = err.message;
      });
  }
}
