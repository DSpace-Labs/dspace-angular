import { Component, OnDestroy, OnInit } from '@angular/core';
import { Collection } from "../../core/shared/collection.model";
import { RemoteData } from "../../core/data/remote-data";
import { CollectionDataService } from "../../core/data/collection-data.service";
import { FeaturedCollectionService } from "../edit-featured-collection/featured-collection.service";
import { Subscription } from "rxjs/Subscription";
import { hasValue } from "../../shared/empty.util";

@Component({
  selector: 'ds-featured-collection',
  styleUrls: ['./featured-collection.component.css'],
  templateUrl: './featured-collection.component.html'
})
export class FeaturedCollectionComponent implements OnInit, OnDestroy {
  collectionId = "5179";
  collection: RemoteData<Collection>;
  private sub: Subscription;

  constructor(
    private cds: CollectionDataService,
    private fcs: FeaturedCollectionService
  ) {
    this.universalInit();
  }

  universalInit() {

  }

  ngOnInit(): void {
    this.sub = this.fcs.collectionId.subscribe(id => {
      this.collection = this.cds.findById(id);
    });
  }

  ngOnDestroy(): void {
    if (hasValue(this.sub)) {
      this.sub.unsubscribe();
    }
  }
}
