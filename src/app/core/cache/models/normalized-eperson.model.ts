import { autoserialize, inheritSerialization } from 'cerialize';
import { EPerson } from '../../shared/eperson.model';
import { mapsTo } from '../builders/build-decorators';
import { NormalizedDSpaceObject } from './normalized-dspace-object.model';

@mapsTo(EPerson)
@inheritSerialization(NormalizedDSpaceObject)
export class NormalizedEPerson extends NormalizedDSpaceObject {

  @autoserialize
  email: string;

  @autoserialize
  firstName: string;

  @autoserialize
  lastName: string;
}
