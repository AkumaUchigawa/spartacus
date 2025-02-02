import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartEntryAdapter } from './cart-entry.adapter';
import { CartEntryConnector } from './cart-entry.connector';
import createSpy = jasmine.createSpy;

describe('CartEntryConnector', () => {
  class MockCartEntryAdapter implements CartEntryAdapter {
    add = createSpy().and.returnValue(of({}));
    update = createSpy().and.returnValue(of({}));
    remove = createSpy().and.returnValue(of({}));
  }

  let service: CartEntryConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartEntryAdapter, useClass: MockCartEntryAdapter },
      ],
    });

    service = TestBed.inject(CartEntryConnector);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('add should call adapter', () => {
    const adapter = TestBed.inject(CartEntryAdapter);
    service.add('1', '2', '3').subscribe();
    expect(adapter.add).toHaveBeenCalledWith(
      '1',
      '2',
      '3',
      undefined,
      undefined
    );
  });

  it('add should call adapter', () => {
    const adapter = TestBed.inject(CartEntryAdapter);
    service.add('1', '2', '3', 4, 'pickupStore').subscribe();
    expect(adapter.add).toHaveBeenCalledWith('1', '2', '3', 4, 'pickupStore');
  });

  it('update should call adapter', () => {
    const adapter = TestBed.inject(CartEntryAdapter);
    service.update('1', '2', '3', 4).subscribe();
    expect(adapter.update).toHaveBeenCalledWith(
      '1',
      '2',
      '3',
      4,
      undefined,
      false
    );
  });

  it('update should call adapter', () => {
    const adapter = TestBed.inject(CartEntryAdapter);
    service.update('1', '2', '3', undefined, 'pickupStore').subscribe();
    expect(adapter.update).toHaveBeenCalledWith(
      '1',
      '2',
      '3',
      undefined,
      'pickupStore',
      false
    );
  });

  it('update should call adapter', () => {
    const adapter = TestBed.inject(CartEntryAdapter);
    service.update('1', '2', '3', 4, undefined, true).subscribe();
    expect(adapter.update).toHaveBeenCalledWith(
      '1',
      '2',
      '3',
      4,
      undefined,
      true
    );
  });

  it('remove should call adapter', () => {
    const adapter = TestBed.inject(CartEntryAdapter);
    service.remove('1', '2', '3').subscribe();
    expect(adapter.remove).toHaveBeenCalledWith('1', '2', '3');
  });
});
