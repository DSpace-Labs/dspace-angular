import { DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';
import { Item } from '../../../../../../core/shared/item.model';
import { RelationshipOptions } from './model/relationship-options.model';

export const DYNAMIC_FORM_CONTROL_TYPE_LOOKUP_RELATION = 'LOOKUP_RELATION';

export interface DynamicLookupRelationModelConfig extends DsDynamicInputModelConfig {
  value?: any;
  repeatable: boolean;
  item: Item;
  relationship: RelationshipOptions;
}

export class DynamicLookupRelationModel extends DsDynamicInputModel {

  @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_LOOKUP_RELATION;
  @serializable() value: any;
  @serializable() repeatable: boolean;
  relationship: RelationshipOptions;
  item: Item;

  constructor(config: DynamicLookupRelationModelConfig, layout?: DynamicFormControlLayout) {

    super(config, layout);

    this.readOnly = true;
    this.disabled = true;
    this.repeatable = config.repeatable;
    this.item = config.item;
    this.relationship = config.relationship;
    this.valueUpdates.next(config.value);
  }
}
