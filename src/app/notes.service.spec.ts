import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { of } from 'rxjs';
const url = 'http://127.0.0.1:8080/noteapp/noteservice';
describe('NotesService', () => {
  let service: NotesService;
  let httpClientSpy: any;
  beforeEach(() => {
    //mock for http client
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    service = new NotesService(httpClientSpy);
  });

  it('notes service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing getNotes', () => {
    const res = 'Venu';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); //of represent returns Observable
    service.getNotes();
    // expect(httpClientSpy.get).toBeCalledTimes(1);//Testing whether get method called
    expect(httpClientSpy.get).toHaveBeenCalledWith(url); //Testing whether get passing with url or not
  });

  it('testing postNotes', () => {
    //const command='testing';
    const data = {
      title: 't',
      author: 'a',
      description: 'd',
      status: 's',
    };
    const res = 'venu';
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    //service.postNotes(command);
    service.postNotes(data);
    // expect(httpClientSpy.post).toBeCalledTimes(1);
    expect(httpClientSpy.post).toHaveBeenCalledWith(url + '/add');
  });

  it('testing patchNotes', () => {
    const command1 = 1;
    //const command2='testing2';
    const data = {
      title: '',
      author: '',
      description: '',
      status: '',
    };

    const res = 'venu';
    jest.spyOn(httpClientSpy, 'patch').mockReturnValue(of(res));
    service.updateNote(command1, data.status);
    // expect(httpClientSpy.patch).toBeCalledTimes(1);
    expect(httpClientSpy.patch).toHaveBeenCalledWith(url + "/update");
  });

  it('testing deleteNotes', () => {
    const command = 1;
    const res = 'venu';
    jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(res));
    service.deleteNotes(command);
    // expect(httpClientSpy.delete).toBeCalledTimes(1);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url + "/delete");
  });
});

//OR -Test Bed approach (Above one is constructor approach)

/*
describe('NotesService', () => {
  let service:NotesService
  beforeEach(() => {  

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(NotesService);

  });
  it('notes service should be created', () => {
    expect(service).toBeTruthy();
  });  

});
*/
