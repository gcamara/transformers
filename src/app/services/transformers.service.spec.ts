import { TestBed } from '@angular/core/testing';
import { TransformersService } from './transformers.service';


describe('TransformersService', () => {
  let service: TransformersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getBots()', () => {
    expect(service.getBots().hasOwnProperty('autobots')).toBeTrue();
    expect(service.getBots().hasOwnProperty('decepticons')).toBeTrue();

    expect(service.getBots().autobots.length).toBeGreaterThan(0);
    expect(service.getBots().decepticons.length).toBeGreaterThan(0);
  });
});
