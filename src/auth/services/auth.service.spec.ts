import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginFormUiModel, LoginResponse } from '../models/login-form-ui.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully login and return a token', () => {
    const mockLoginBody: LoginFormUiModel = { username: 'eve.holt@reqres.in', password: 'cityslicka' };
    const mockResponse: LoginResponse = { token: 'QpwL5tke4Pnpja7X4' };

    service.login(mockLoginBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should set token in localStorage', () => {
    const token = 'QpwL5tke4Pnpja7X4';
    service.setToken(token);
    expect(localStorage.getItem('accessToken')).toBe(token);
  });

  it('should return true if user is logged in', () => {
    const token = 'QpwL5tke4Pnpja7X4';
    localStorage.setItem('accessToken', token);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if user is not logged in', () => {
    localStorage.removeItem('accessToken');
    expect(service.isLoggedIn()).toBeFalse();
  });
});
