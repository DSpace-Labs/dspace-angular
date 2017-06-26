import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ds-edit-featured-collection',
  styleUrls: ['./edit-featured-collection.component.css'],
  templateUrl: './edit-featured-collection.component.html'
})
export class EditFeaturedCollectionComponent implements OnInit {
  collectionId = "5179";

  constructor() {
    this.universalInit();
  }

  universalInit() {

  }

  ngOnInit(): void {
  }

  onUpdate(): void {
    console.log(this.collectionId);
  }
}
