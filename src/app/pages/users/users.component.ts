import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(public menuService: MenuService){
  }

  ngOnInit(){
    this.menuService.menuSelecionado = 2;
  }
}
