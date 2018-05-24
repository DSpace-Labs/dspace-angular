import { GenericConstructor } from '../../shared/generic-constructor';
import { ResourceType } from '../../shared/resource-type';
import { NormalizedBitstream } from './normalized-bitstream.model';
import { NormalizedBundle } from './normalized-bundle.model';
import { NormalizedCollection } from './normalized-collection.model';
import { NormalizedCommunity } from './normalized-community.model';
import { NormalizedEPerson } from './normalized-eperson.model';
import { NormalizedItem } from './normalized-item.model';
import { NormalizedObject } from './normalized-object.model';

export class NormalizedObjectFactory {
  public static getConstructor(type: ResourceType): GenericConstructor<NormalizedObject> {
    switch (type) {
      case ResourceType.Bitstream: {
        return NormalizedBitstream
      }
      case ResourceType.Bundle: {
        return NormalizedBundle
      }
      case ResourceType.Item: {
        return NormalizedItem
      }
      case ResourceType.Collection: {
        return NormalizedCollection
      }
      case ResourceType.Community: {
        return NormalizedCommunity
      }
      case ResourceType.EPerson: {
        return NormalizedEPerson
      }
      default: {
        return undefined;
      }
    }
  }
}
