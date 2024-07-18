import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User, UserList } from '../models/user.model';
import {HttpClient} from "@angular/common/http";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const mockUsers = {
      data: [
        { id: 1, email: 'test1@example.com', first_name: 'Test1', last_name: 'User1', avatar: 'avatar1' },
        { id: 2, email: 'test2@example.com', first_name: 'Test2', last_name: 'User2', avatar: 'avatar2' }
      ]
    };

    service.getAllUsers().subscribe(users => {
       // @ts-ignore
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get a user by ID', () => {
    const mockUser: User = { id: 1, email: 'test1@example.com', first_name: 'Test1', last_name: 'User1', avatar: 'avatar1' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a new user', () => {
    const newUser = { email: 'test@example.com', first_name: 'Test', last_name: 'User', avatar: 'avatar' };
    const mockResponse = { id: 3, ...newUser };

    service.createUser(newUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update an existing user', () => {
    const updatedUser = { id: 1, email: 'updated@example.com', first_name: 'Updated', last_name: 'User', avatar: 'avatar' };

    service.updateUser(updatedUser).subscribe(response => {
      expect(response).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user', () => {
    const mockResponse = { message: 'User deleted' };

    service.deleteUser(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
