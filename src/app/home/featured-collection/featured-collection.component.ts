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
  isLoading: boolean;
  hasSucceeded: boolean;

  constructor(private cds: CollectionDataService) {
    this.universalInit();
  }

  universalInit() {

  }

  ngOnInit(): void {
    this.collection = this.cds.findById(this.collectionId);
    this.collection.isLoading.subscribe(s => this.isLoading = s);
    this.collection.hasSucceeded.subscribe(s => this.hasSucceeded = s);
  }
}
