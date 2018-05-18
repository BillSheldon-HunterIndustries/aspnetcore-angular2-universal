import {
  Component, OnInit, Inject
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    animations: [
        // Animation example
        // Triggered in the ngFor with [@flyInOut]
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(-100%)' }),
                animate(1000)
            ]),
            transition('* => void', [
                animate(1000, style({ transform: 'translateY(100%)' }))
            ])
        ])
    ]
})
export class UsersComponent implements OnInit {

  users: IUser[];
  selectedUser: IUser;


    // Use "constructor"s only for dependency injection
    constructor(
      private userService: UserService
    ) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        this.userService.getUsers().subscribe(result => {
            console.log('HttpClient [GET] /api/users/allresult', result);
            this.users = result;
        });
    }

  onSelect(user: IUser): void {
    this.selectedUser = user;
  }


    deleteUser(user) {
        this.userService.deleteUser(user).subscribe(result => {
            console.log('Delete user result: ', result);
            let position = this.users.indexOf(user);
            this.users.splice(position, 1);
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
        });
    }

    addUser(newUserName) {
        this.userService.addUser(newUserName).subscribe(result => {
            console.log('Post user result: ', result);
            this.users.push(result);
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
        });
    }
  }
}
