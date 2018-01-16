import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./blog.layout.html",
    styleUrls: ['./blog.layout.css']
})
export class BlogLayout{
    @Input() data : Array<any>;
}