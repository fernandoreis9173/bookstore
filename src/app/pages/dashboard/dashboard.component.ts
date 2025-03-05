import { Component } from '@angular/core';
import { CurriculoService } from 'src/app/services/curriculo.service.ts.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  totalCurriculo: number = 0 ;

  constructor(
    public menuService: MenuService,
    public curriculoService: CurriculoService
  ){
  }

  ngOnInit(){
    this.menuService.menuSelecionado = 1;
    this.getTotalCurriculo();
  }



  getTotalCurriculo() {
    this.tipoTela = 1;

    this.curriculoService.getTotalCurriculo().subscribe(
      (response: any) => {
        this.totalCurriculo = response.total;
      },
      (error) => console.error(error),
      () => {}
    );
  }

}
