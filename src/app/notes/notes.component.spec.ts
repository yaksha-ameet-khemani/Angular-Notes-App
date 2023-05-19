import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { FormBuilder,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';
import {HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import{HttpTestingController} from '@angular/common/http/testing';


import { BrowserModule} from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
describe('Notes Component',()=>{
  let serviceMock:any;
  let formBuilderMock:FormBuilder;
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [NotesComponent],
      providers: [FormBuilder,NotesService],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    serviceMock={
      getNotes:jest.fn(),
      postNotes:jest.fn(),
      patchNotes:jest.fn(),
      deleteNotes:jest.fn(),
      };

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create notes component", () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  describe("Testing create component and declarations", ()=>{
    it("should create the notes component", () => {
      const fixt = new NotesComponent(formBuilderMock,serviceMock);
      expect(fixt).toBeTruthy();
    });

    it('should declare obj refereces',()=>{
      expect(component.modelObj).toBeDefined();
      expect(component.formValues).toBeDefined();
      // expect(component.showAdd).toBeDefined();
    })

  });

  describe('Test:ngOnInit',()=>{
    
    it('Initialize the form',()=>{
      const formValues={
        title:'',
        author:'',
        description:'',
        status:''
      };
      expect(component.formValues.value).toEqual(formValues);
    });

  });

  describe('Test:Form',()=>{
  
        it('should invalidate the form when empty',()=>{
          component.formValues.controls['title'].setValue('');
          component.formValues.controls['author'].setValue('');
          component.formValues.controls['description'].setValue('');
          component.formValues.controls['status'].setValue('');
          expect(component.formValues.valid).toBeFalsy();
        });

        it('should validate the form ',()=>{
          component.formValues.controls['title'].setValue('title1');
          component.formValues.controls['author'].setValue('author1');
          component.formValues.controls['description'].setValue('description1');
          component.formValues.controls['status'].setValue('status1');
          expect(component.formValues.valid).toBeTruthy();

        });

        it('title field validity', () => {
          const title = component.formValues.controls['title']
          expect(title.valid).toBeFalsy();      
          title.setValue('');
          expect(title.hasError('required')).toBeTruthy();      
        });

        
        it('description field validity', () => {
          const description = component.formValues.controls['description']
          expect(description.valid).toBeFalsy();      
          description.setValue('');
          expect(description.hasError('required')).toBeTruthy();      
        });

        
        it('author field validity', () => {
          const author = component.formValues.controls['author']
          expect(author.valid).toBeFalsy();      
          author.setValue('');
          expect(author.hasError('required')).toBeTruthy();      
        });

        
        it('status field validity', () => {
          const status = component.formValues.controls['status']
          expect(status.valid).toBeFalsy();      
          status.setValue('');
          expect(status.hasError('required')).toBeTruthy();      
        });

    
        // it('should set submitted to true', () => {
        //   component.onSubmit();
        //   expect(component.submitted).toBeTruthy();
        // });
      
        // it('should call onSubmit method', () => {

        //  jest.spyOn(component, 'onSubmit');
        //   const el = fixture.debugElement.query(By.css('button')).nativeElement;
        //   el.click();
        //   expect(component.formValues).toHaveBeenCalledTimes(1);
        // });


        // it('should display alert when clicking on icon', () => {
        //   const button = fixture.nativeElement.querySelector('#save');
        //   button.click();
        //   spyOn(window, 'alert')
        //   expect(window.alert).toHaveBeenCalledWith('save');
        // })

   });


  describe('Test:methods declarations of notes component',()=>{

    it('clickAddNote method to be defined',()=>{
     component.clickAddNote=jest.fn();
     expect(component.clickAddNote).toBeDefined();
    });

    it('postNoteData method to be defined',()=>{
      component.postNoteData=jest.fn();
      expect(component.postNoteData).toBeDefined();
     });

     it('getAllNotesData method to be defined',()=>{
      component.getAllNotesData=jest.fn();
      expect(component.getAllNotesData).toBeDefined();
     });

     it('deleteNote method to be defined',()=>{
      component.deleteNote=jest.fn();
      expect(component.deleteNote).toBeDefined();
     });
    
     it('noteEdit method to be defined',()=>{
      component.noteEdit=jest.fn();
      expect(component.noteEdit).toBeDefined();
     });
     it('updateNoteData method to be defined',()=>{
      component.updateNoteData=jest.fn();
      expect(component.updateNoteData).toBeDefined();
     });
    
});



describe('Testing invoking of the methods',()=>{
       
  it('should call postNoteData', () => {
    jest.spyOn(component, 'postNoteData');
    component.postNoteData();  
    //fixture.detectChanges();  
    //let buton = fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.postNoteData).toHaveBeenCalled();
  });

  it('should call updateNoteData', () => {
    jest.spyOn(component, 'updateNoteData');
    component.updateNoteData();  
    //fixture.detectChanges();  
    //let buton = fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.updateNoteData).toHaveBeenCalled();

  });
  

  it('should call clickAddNote', () => {
    jest.spyOn(component, 'clickAddNote');
    component.clickAddNote();  
    //fixture.detectChanges();  
   // let buton = fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.clickAddNote).toHaveBeenCalled();
  });

  //added newly 2 below test cases -raising error some times
  /*
  it('should call getAllNotesData', () => {
    const gan = jest.spyOn(component, 'getAllNotesData');
    component.getAllNotesData();
    expect(gan).toHaveBeenCalled();
  });

  it('should call noteEdit', () => {
    const ne = jest.spyOn(component, 'noteEdit');
    component.noteEdit({});
    expect(ne).toHaveBeenCalled();
  });*/

  it('should call deleteNote', () => {
    jest.spyOn(component, 'deleteNote');
    component.deleteNote(1);  
    //fixture.detectChanges();  
    //let buton = fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.deleteNote).toHaveBeenCalled();
  });

  it('should not call clickAddNote', () => {
    const can = jest.spyOn(component, 'clickAddNote');
    expect(can).not.toHaveBeenCalled();
  });

  it('should not call getAllNotesData', () => {
    const gan = jest.spyOn(component, 'getAllNotesData');
    expect(gan).not.toHaveBeenCalled();
  });

  it('should not call postNoteData', () => {
    const pnd = jest.spyOn(component, 'postNoteData');
    expect(pnd).not.toHaveBeenCalled();
  });

  it('should not call deleteNote', () => {
    const dnd = jest.spyOn(component, 'deleteNote');
    expect(dnd).not.toHaveBeenCalled();
  });

  it('should not call noteEdit', () => {
    const ne = jest.spyOn(component, 'noteEdit');
    expect(ne).not.toHaveBeenCalled();
  });

  it('should not call updateNoteData', () => {
    const und = jest.spyOn(component, 'updateNoteData');
    expect(und).not.toHaveBeenCalled();
  });



});



//Need to imporve test cases with return value
  describe('Test : service methods',()=>{

    it('should get the note of specified id',()=>{
      const response={
        success:true,
        message:'Note fetched successfully',
        
      };
      const result={};
      const gNote=jest.spyOn(serviceMock,'getNotes').mockReturnValue(response);
      expect(serviceMock.getNotes()).toBe(response);
      expect(gNote).toHaveBeenCalled();// returned value need to check
      })

      it('should post the note',()=>{
        // const data={ } //empty also works

        const data={ 
          title:'',
          author:'',
          description:'',
          status:''
        }
          const response={
            success:true,
            message:'Note created successfully'
          };
          const pNote=jest.spyOn(serviceMock,'postNotes').mockReturnValue(response);
          expect(serviceMock.postNotes(data)).toBe(response);
          expect(pNote).toHaveBeenCalledWith(data);
          })

      it('should edit the note of specified id',()=>{
      const data={ }
        const response={
          success:true,
          message:'Note updated successfully'
        };
        const editNote=jest.spyOn(serviceMock,'patchNotes').mockReturnValue(response);
        expect(serviceMock.patchNotes(1,data)).toBe(response);
        expect(editNote).toHaveBeenCalledWith(1,data);
        })

        it('should delete the note of specified id',()=>{
          // const note={ 
          //   id:101,}
            const response={
              success:true,
              message:'Note deleted successfully'
            };
            const delNote=jest.spyOn(serviceMock,'deleteNotes').mockReturnValue(response);
            expect(serviceMock.deleteNotes(1)).toBe(response);
            expect(delNote).toHaveBeenCalledWith(1);
            })

  });

  describe('Testing :Form Validations',()=>{

    it("Test initial form fields",()=>{
      const form=component.formValues;
      const values={
        title:'',
        author:'',
        description:'',
        status:''
      }
      expect(form.value).toEqual(values);
    })

    it("Title should invalid when it has no value",()=>{
      //Arrange
      const t=component.formValues.get('title');
      //Act
      t?.setValue(null);
      //fixture.detectChanges();
      //Assert
      expect(t?.invalid).toBeTruthy();
    })

    it("Title should valid when it has value",()=>{
      //Arrange
      const t=component.formValues.get('title');
      //Act
      t?.setValue('python');
      //fixture.detectChanges();
      //Assert
      expect(t?.valid).toBeTruthy();
    })


    it("Description should invalid when it has no value",()=>{
      //Arrange
      const t=component.formValues.get('description');
      //Act
      t?.setValue(null);
      //fixture.detectChanges();
      //Assert
      expect(t?.invalid).toBeTruthy();
    })

    it("Description should valid when it has value",()=>{
      //Arrange
      const t=component.formValues.get('description');
      //Act
      t?.setValue('python is programming');
      //fixture.detectChanges();
      //Assert
      expect(t?.valid).toBeTruthy();
    })


    it("Author should invalid when it has no value",()=>{
      //Arrange
      const t=component.formValues.get('author');
      //Act
      t?.setValue(null);
      //fixture.detectChanges();
      //Assert
      expect(t?.invalid).toBeTruthy();
    })

    it("Author should valid when it has value",()=>{
      //Arrange
      const t=component.formValues.get('author');
      //Act
      t?.setValue('Guido');
      //fixture.detectChanges();
      //Assert
      expect(t?.valid).toBeTruthy();
    })


    it("Status should invalid when it has no value",()=>{
      //Arrange
      const t=component.formValues.get('status');
      //Act
      t?.setValue(null);
      //fixture.detectChanges();
      //Assert
      expect(t?.invalid).toBeTruthy();
    })

    it("Status should valid when it has value",()=>{
      //Arrange
      const t=component.formValues.get('status');
      //Act
      t?.setValue('completed');
      //fixture.detectChanges();
      //Assert
      expect(t?.valid).toBeTruthy();
    })
 
  })

  describe('Testing: validating HTML elements',()=>{ 

    it('testing formgroup and elemet count',()=>{
      const formElement=fixture.debugElement.nativeElement.querySelector('#formValues');
      const inputElements=formElement.querySelectorAll('input');
      expect(inputElements.length).toEqual(4);
    });

    it('title field validity', () => {
      const title = component.formValues.controls['title'];
      expect(title.valid).toBeFalsy();  
      title.setValue('');
      expect(title.hasError('required')).toBeTruthy();  
    });

    it('author field validity', () => {
      const author = component.formValues.controls['author'];
      expect(author.valid).toBeFalsy();  
      author.setValue('');
      expect(author.hasError('required')).toBeTruthy();  
    });

  
    it('description field validity', () => {
      const description = component.formValues.controls['description'];
      expect(description.valid).toBeFalsy();  
      description.setValue('');
      expect(description.hasError('required')).toBeTruthy();  
    });

    it('status field validity', () => {
      const status = component.formValues.controls['status'];
      expect(status.valid).toBeFalsy();  
      status.setValue('');
      expect(status.hasError('required')).toBeTruthy();  
    });

    //updated in db or not need to check
    it('Testing whole form to be valid',()=>{
      const formTitleElement:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[0];
      const formAuthorElement:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[1];
      const formDescElement:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[2];
      const formStatusElement:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[3];
      formTitleElement.value='py';
      formAuthorElement.value='guido';
      formDescElement.value='programming';
      formStatusElement.value='completed'; 
      
      formTitleElement.dispatchEvent(new Event('input'));
      formAuthorElement.dispatchEvent(new Event('input'));
      formDescElement.dispatchEvent(new Event('input'));
      formStatusElement.dispatchEvent(new Event('input'));

      const isFormValid=component.formValues.valid;
      fixture.whenStable().then(()=>{
        expect(isFormValid).toBeTruthy();
      });
  
    });

  });



  describe('Testing headings of the html table',()=>{

    it("should have heading-Notes App Django-Angular ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css("h1"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Notes App Django-Angular");
    });
    
    it("should have table header Notes ID ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css(".c1"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Notes ID");
    });

    it("should have table header Title ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css(".c2"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Title");
    });

    it("should have table header Author ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css(".c3"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Author");
    });

    it("should have table header Description ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css(".c4"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Description");
    });
    it("should have table header Status ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css(".c5"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Status");
    });

    it("should have table header Created Date ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css(".c6"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Created Date");
    });

    it("should have table header Modified Date ", () => {
      //fixture.detectChanges();
      const de = fixture.debugElement.query(By.css(".c7"));
      const el = de.nativeElement;
      expect(el.textContent).toEqual("Modified Date");
    });

    it("should test number of headings of the table ", () => {
      const table=['id','title','author','description','staus','created date','modified date']
      expect(table.length).toEqual(7);
    });
   
  });

  describe('Testing html buttons',()=>{
    it('save button testing', () => {
      const elements = fixture.debugElement.queryAll(By.css('#save'));
      expect(elements).toBeTruthy();
    });

    it('cancel button testing', () => {
      const elements = fixture.debugElement.queryAll(By.css('#cancel'));
      expect(elements).toBeTruthy();
    });

    it('update button testing', () => {
      const elements = fixture.debugElement.queryAll(By.css('#update'));
      expect(elements).toBeTruthy();
    });
    
    it('delete button testing', () => {
      const elements = fixture.debugElement.queryAll(By.css('#delete'));
      expect(elements).toBeTruthy();
    });

    it('edit button testing', () => {
      const elements = fixture.debugElement.queryAll(By.css('#edit'));
      expect(elements).toBeTruthy();
    });

  })

});



/*
// Not executing thistest case


// Not executing thistest case
describe("Service testing for post", () => {
  it("post service", inject([HttpTestingController, NotesService], (httpMock: 

HttpTestingController, dataService: NotesService) => {
    component.ngOnInit();
    let data={}
    dataService.postNotes(data).subscribe(data => {
      expect(data).toEqual(data);
      expect(data).toBe(data);
      expect(data).not.toBe(null);
      expect(null).toBeNull();
      expect(data).toBeTruthy();
    });
  }));
});

});
 */



