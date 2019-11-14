import { Component, EventEmitter, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { stringify } from '@angular/compiler/src/util';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = '';
    post: Post;
    isLoading = false;
    private mode = 'create';
    private postId: string;
     

    constructor(
        public postsService: PostsService, 
        public route: ActivatedRoute
    ){}

    ngOnInit(){  
        this.route.paramMap.subscribe((paramMap: ParamMap) => { 
            //paramMap is a variable contains the variables passed in the address after ':'
            //checking if we are creating or editing a post:
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                console.log(this.postId);
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id, title: postData.title, content: postData.content};
                });
                console.log('post to be edited: ' + this.post);
            } else {
              this.mode = "create";
              this.postId = null;
            }
        });
        //throw new Error("Method not implemented.");
    }

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postsService.addPost(form.value.title, form.value.content);    //adding post
            
        } else {
            this.postsService.updatePost(
                this.postId, 
                form.value.title, 
                form.value.content);    //updating post
        }
        form.resetForm(); 
    }


}