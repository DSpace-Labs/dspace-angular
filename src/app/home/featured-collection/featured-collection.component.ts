import { Component, OnInit } from '@angular/core';
import { Collection } from "../../core/shared/collection.model";
import { RemoteData } from "../../core/data/remote-data";
import { CollectionDataService } from "../../core/data/collection-data.service";

@Component({
  selector: 'ds-featured-collection',
  styleUrls: ['./featured-collection.component.css'],
  templateUrl: './featured-collection.component.html'
})
export class FeaturedCollectionComponent implements OnInit {
  collectionId = "5179";
  collection: RemoteData<Collection>;

  constructor(private cds: CollectionDataService) {
    this.universalInit();
  }

  universalInit() {

  }

  ngOnInit(): void {
    this.collection = this.cds.findById(this.collectionId);
    this.collection.isLoading.subscribe(s => console.log('isLoading', s));
    this.collection.hasSucceeded.subscribe(s => console.log('hasSucceeded', s));
    this.collection.hasFailed.subscribe(s => console.log('hasFailed', s));
  }
}
