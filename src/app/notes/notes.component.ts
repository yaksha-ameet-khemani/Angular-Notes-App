import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../notes.service';
import { NotesModel } from './notes.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  //title = 'NotesComponent';
  formValues!: FormGroup;
  modelObj: NotesModel = new NotesModel();
  allNotesData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  //submitted = false;
  constructor(private fB: FormBuilder, private api: NotesService) {}

  ngOnInit(): void {
    this.formValues = this.fB.group({
      //title:['',Validators.compose([Validators.required])],
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getAllNotesData(); //Need to enable ,if enable test case raising an error
  }

  get title() {
    return this.formValues.get('title');
  }
  get author() {
    return this.formValues.get('author');
  }
  get description() {
    return this.formValues.get('description');
  }
  get status() {
    return this.formValues.get('status');
  }

  //calls when you click on Add Employee button
  clickAddNote() {
    this.formValues.reset(); //reset the form
    this.showAdd = true;
    this.showUpdate = false;
  }

  //Save Data
  postNoteData() {
    this.modelObj.title = this.formValues.value.title;
    this.modelObj.author = this.formValues.value.author;
    this.modelObj.description = this.formValues.value.description;
    this.modelObj.status = this.formValues.value.status;
    this.api.postNotes(this.modelObj).subscribe(
      (res) => {
        alert('Notes Saved Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValues.reset(); //reset the form
        this.getAllNotesData();
        // this.onSubmit();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //Get data

  getAllNotesData() {
    this.api.getNotes().subscribe((res) => {
      this.allNotesData = res;
    });
  }

  //New format- but showing errors

  // getAllNotesData(){
  //   this.api.getNotes().subscribe({
  //     next:data=>{},
  //     error:err=>{},
  //     complete:{}=>{},
  //   });
  // }

  //Delete data
  deleteNote(emp: any) {
    this.api.deleteNotes(emp.id).subscribe((res) => {
      alert('Notes Deleted Successfully');
      this.getAllNotesData(); //To show available records on delete immediately (else need to refresh page)
    });
  }

  // set values of specfid emp to html form fields to edit
  noteEdit(note: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.modelObj.id = note.id;
    this.formValues.controls['title'].setValue(note.title);
    this.formValues.controls['author'].setValue(note.author);
    this.formValues.controls['description'].setValue(note.description);
    this.formValues.controls['status'].setValue(note.status);
    this.formValues.controls['salary'].setValue(note.salary);
  }

  //Update  data
  updateNoteData() {
    this.modelObj.title = this.formValues.value.title;
    this.modelObj.author = this.formValues.value.author;
    this.modelObj.description = this.formValues.value.description;
    this.modelObj.status = this.formValues.value.status;
    this.api.updateNote(this.modelObj.id, this.modelObj.status).subscribe(
      (res) => {
        alert('Notes Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValues.reset(); //reset the form
        this.getAllNotesData();
        // this.onSubmit();
      },
      (err) => {
        alert('Something went wrong....');
      }
    );
  }

  //Not required

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.formValues.invalid) {
  //     return;
  //   }
  //   this.submitted = false;
  // }
}
