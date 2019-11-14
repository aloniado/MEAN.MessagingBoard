import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from './post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})  //ensures that angular only creates one instnce of the service
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) {

    }

    getPosts() {
        //return [...this.posts]; //... returns a copy of the array so it cannot be changed directly
        this.http
        .get<{message: string, posts: any}>(
            'http://localhost:3000/api/posts/'
        )
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content : post.content,
                    id: post._id
                };
            });
        }))
        .subscribe( (transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
/*
    getPost (id: string) {
        return {...this.posts.find(p => p.id === id)}; //... means a spread property: pulling all the properties of an object
    }
*/
    getPost(id: string) {
        return this.http
        .get<{ _id: string; title: string; content: string }>(
        "http://localhost:3000/api/posts/" + id
        );
    }
    

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content}
        this.http
        .post<{message: string, postId: string}>("http://localhost:3000/api/posts/", post)
        .subscribe((responseData) => {
            //console.log(responseData.message);
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
            }); 
    }

    updatePost(id: string, title: string, content: string){
        const post: Post = { id: id, title: title, content: content};   //JS object
        this.http.put("http://localhost:3000/api/posts/" + id, post)
            .subscribe(response => {
                console.log(response);
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(["/"]);
            })
    }

    deletePost(postId: string){
        this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(() => {
            //console.log('Deleted!');
            const updatedPosts = this.posts.filter(post => post.id !== postId); //new array of posts withput the one that was deleted
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]); //updating posts visible to user
        })
    }
}