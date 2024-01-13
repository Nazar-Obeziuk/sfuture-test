import { TestBed } from '@angular/core/testing';

import { UserCoachService } from './user-coach.service';

describe('UserCoachService', () => {
  let service: UserCoachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCoachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
