import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
  providers: [ PostService ]
})


export class AdminDetailComponent implements OnInit {
  postId: string;
  postToDisplay;

  constructor (private route: ActivatedRoute, private router: Router, private location: Location, private postService: PostService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
     this.postId = urlParameters['id'];
   });
   this.postToDisplay = this.postService.getPostById(this.postId).subscribe(dataLastEmittedFromObserver => {
     this.postToDisplay = dataLastEmittedFromObserver;
    });
  }

  updatePost() {
    if (confirm('Save changes to post?')) {
      this.postService.updatePost(this.postToDisplay);
    }
  }

  addTags(tags: string) {
    const tagsArray = tags.split(',');
    for (let i = 0; i < tagsArray.length; i++) {
      const trim = (tagsArray[i].trim()).toLowerCase();
      this.postToDisplay.tags.push(trim);
      }
    this.postService.updatePostTags(this.postToDisplay);
  }

  removeTag(idx) {
    this.postToDisplay.tags.splice(idx, 1);
    this.postService.updatePostTags(this.postToDisplay);
  }

  deletePost() {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(this.postToDisplay);
      this.router.navigate(['admin']);
    }
  }

}
