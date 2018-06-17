import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { RoomRepositoryService } from './room-repository.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms = [];
  constructor(private roomRepositoryService: RoomRepositoryService) { }

  ngOnInit() {
    this.roomRepositoryService.getAll()
    .pipe(first()).subscribe(rooms => { 
        this.rooms = rooms; 
    });

    console.log(this.rooms);
  }

}
