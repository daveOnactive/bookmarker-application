import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from './bookmark';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  addBookmark: boolean = true;
  update: boolean = false;
  flag: boolean = false;
  getID: number;
  class: string;
  displayMessage: string;
  icon: string;
  bookmarks: Bookmark = {
    bookmarkName: null,
    bookmarkUrl: null
  };

  bookmarkArray: any[] = [
    {
      id: this.getId(),
      bookmarkName: 'Google',
      bookmarkUrl: 'http://www.google.com'
    },
    {
      id: this.getId(),
      bookmarkName: 'Facebook',
      bookmarkUrl: 'http://www.facebook.com'
    },
    {
      id: this.getId(),
      bookmarkName: 'Twitter',
      bookmarkUrl: 'http://www.twitter.com'
    }
  ];
  NotifyService: any;
  remove: boolean = false;
  add: boolean = false;

  constructor() { }

  getId() {
    const random = Math.random();
    return random;
  }

  notify() {
    if (this.flag) {
      if (this.add) {
        return ['success'];
      } else if (this.remove) {
        return ['remove'];
      }
    }
    return [];
  }

  successNotifications(message: string) {
    this.flag = true;
    this.add = true;
    this.displayMessage = message;
    setTimeout(() => {
      this.flag = false;
      this.add = false;
    }, 1500);
  }

  removeNotifications(message: string) {
    this.flag = true;
    this.remove = true;
    this.displayMessage = message;
    setTimeout(() => {
      this.flag = false;
      this.remove = false;
    }, 1500);
  }

  removedBookmarkNotify(data) {
    this.removeNotifications(data);
  }


  emmitBookmark(id) {
    this.bookmarkArray.forEach((booklist, index) => {
      if (id === booklist.id) {
        this.bookmarks.bookmarkName = booklist.bookmarkName;
        this.bookmarks.bookmarkUrl = booklist.bookmarkUrl;
      }
    });
    this.update = true;
    this.addBookmark = false;
    this.getID = id;
  }

  updateBookmark() {
    this.bookmarkArray.forEach((list) => {
      if (this.getID === list.id) {
        list.id = this.getID;
        list.bookmarkName = this.bookmarks.bookmarkName;
        list.bookmarkUrl = this.bookmarks.bookmarkUrl;
      }
    });
    this.clearForm();
    this.update = false;
    this.addBookmark = true;
    this.successNotifications('Bookmark Updated');
  }

  cancelUpdate(): void {
    this.clearForm();
    this.update = false;
    this.addBookmark = true;
  }

  clearForm(): void {
    this.bookmarks.bookmarkName = null;
    this.bookmarks.bookmarkUrl = null;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.bookmarkArray.push({
        id: this.getId(),
        bookmarkName: this.bookmarks.bookmarkName,
        bookmarkUrl: this.bookmarks.bookmarkUrl
      });
      form.resetForm();
      this.successNotifications('Bookmark Added');
    }

  }


  ngOnInit() {
  }

}
