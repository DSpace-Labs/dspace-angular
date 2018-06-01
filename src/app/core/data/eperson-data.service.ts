import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { hasValue, isNotEmpty } from '../../shared/empty.util';
import { MOCK_EPERSON_DATA } from '../../shared/mocks/mock-eperson-data';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { NormalizedEPerson } from '../cache/models/normalized-eperson.model';
import { ResponseCacheService } from '../cache/response-cache.service';
import { CoreState } from '../core.reducers';
import { DSpaceRESTv2Serializer } from '../dspace-rest-v2/dspace-rest-v2.serializer';
import { EPerson } from '../shared/eperson.model';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { PageInfo } from '../shared/page-info.model';
import { DataService } from './data.service';
import { PaginatedList } from './paginated-list';
import { RemoteData } from './remote-data';
import { FindAllOptions } from './request.models';
import { RequestService } from './request.service';

export class EPersonDataService extends DataService<NormalizedEPerson, EPerson> {
  protected linkPath = 'epersons';
  protected responseCache: ResponseCacheService;
  protected requestService: RequestService;
  protected rdbService: RemoteDataBuildService;
  protected store: Store<CoreState>;
  protected halService: HALEndpointService;

  constructor(
  ) {
    super();
  }

  getScopedEndpoint(scope: string): Observable<string> {
    return this.halService.getEndpoint(this.linkPath);
  }


  findAll(options: FindAllOptions = {}): Observable<RemoteData<PaginatedList<EPerson>>> {
    return this._findMock(options);
  }

  private _findMock(options: any = {}, matchFn?: (eperson: any) => boolean) {
    let matches;
    let ePeople = [];

    if (hasValue(matchFn)) {
      matches = MOCK_EPERSON_DATA.filter(matchFn);
    } else {
      matches = MOCK_EPERSON_DATA;
    }

    if (isNotEmpty(matches)) {
      const serializer = new DSpaceRESTv2Serializer(NormalizedEPerson);
      const normalized = serializer.deserializeArray(matches);

      ePeople = normalized.map((norm: NormalizedEPerson) => Object.assign(new EPerson(), norm) as EPerson);
    }

    const elementsPerPage = isNotEmpty(options.elementsPerPage) ? options.elementsPerPage : 10;
    const pageInfo = {
      elementsPerPage,
      totalElements: ePeople.length,
      totalPages: Math.ceil(ePeople.length / elementsPerPage),
      currentPage: isNotEmpty(options.currentPage) ? options.currentPage : 1
    } as PageInfo;

    const start = (pageInfo.currentPage - 1) * pageInfo.elementsPerPage;
    const end = start + pageInfo.elementsPerPage;
    const payload = new PaginatedList(pageInfo, ePeople.slice(start, end));

    const interval = Observable.interval(500).pipe(take(3));

    const data = Observable.from([
      new RemoteData(
        true,
        false,
        undefined,
        undefined,
        undefined
      ),
      new RemoteData(
        false,
        true,
        undefined,
        undefined,
        undefined
      ),
      new RemoteData(
        false,
        false,
        true,
        undefined,
        payload
      ),
    ]);

    return Observable.zip(interval, data, (time, rd) => rd);
  }

  findByName(name: string): Observable<RemoteData<PaginatedList<EPerson>>> {
    const options = { query: name.toLowerCase() };
    const matchFn = (eperson: any) => eperson.firstName.toLowerCase().includes(options.query);
    return this._findMock(options, matchFn)
  }
}
