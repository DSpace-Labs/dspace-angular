import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class FeaturedCollectionService {
  collectionId: BehaviorSubject<string>;


  constructor() {
    this.collectionId = new BehaviorSubject<string>("5179");
  }

  update(newId: string) {
    this.collectionId.next(newId);
  }
}
