import { Component, OnInit } from '@angular/core';
import { FeaturedCollectionService } from "./featured-collection.service";

@Component({
  selector: 'ds-edit-featured-collection',
  styleUrls: ['./edit-featured-collection.component.css'],
  templateUrl: './edit-featured-collection.component.html'
})
export class EditFeaturedCollectionComponent implements OnInit {
  collectionId: string;

  constructor(private fcs: FeaturedCollectionService) {
    this.universalInit();
  }

  universalInit() {

  }

  ngOnInit(): void {
    this.collectionId = this.fcs.collectionId.getValue();
  }

  onUpdate(): void {
    this.fcs.update(this.collectionId);
  }
}
