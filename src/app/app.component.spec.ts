import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent]
      }).compileComponents();
    }));

    describe("boundary", ()=>{

      it("should create the app component", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
    });
    
  })



/*
//Working
import { AppComponent } from "./app.component";

describe('AppComponent',()=>{
    let fixture:AppComponent;
    beforeEach(()=>{
        fixture=new AppComponent();
    })

   //testig title of the app
   it('should have a title NotesProjectFrontend',()=>{
    expect(fixture.title).toEqual('NotesProjectFrontend');
   })

  //  it('',()=>{
   
  //  })

})
*/