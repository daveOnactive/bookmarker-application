import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifyService } from 'src/app/common/notify.service';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit {
  @Input() bookmarksArray: any[] = [];
  @Output() editClick = new EventEmitter();
  @Output() flag = new EventEmitter();

  constructor() { }

  bookmarksEdit(data: any[]) {
    return this.editClick.emit(data);
  }

  deleteBookmark(id): void {
    this.bookmarksArray.forEach((booklist, index) => {
      if (id === booklist.id) {
        this.bookmarksArray.splice(index, 1);
      }
    });

    return this.flag.emit('Bookmark removed');
  }

  ngOnInit() {
  }

}
