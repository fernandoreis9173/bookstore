import { Component } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
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

  // agendamentos: Agendamento[] = [];
  // diasMes: { data: string; status?: string }[] = [];
  diasMes: any[] = [];

  agendamentos = [];

  constructor(
    public menuService: MenuService,
    public curriculoService: CurriculoService,
    private agendamentoService: AgendamentoService
  ){
  }

  ngOnInit(){
    this.gerarDiasDoMes(2025, 2);
    this.menuService.menuSelecionado = 1;
    this.getTotalCurriculo();
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.getAgendamento().subscribe(
      (data) => {
        console.log("verificando data", data.result);

        // Mapeia apenas os campos necessários
        this.agendamentos = data.result.map((item: any) => ({
            dataInicial: item.dataInicial,
            dataFinal: item.dataFinal
        }));

        this.gerarDiasDoMes(2025, 2); // Março (mês 2, pois janeiro = 0)
    },
      (error) => {
        console.error('Erro ao buscar agendamentos', error);
      }
    );
  }

  gerarDiasDoMes(ano: number, mes: number) {
    this.diasMes = [];
    const diasNoMes = new Date(ano, mes + 1, 0).getDate(); // Total de dias no mês

    // Criando os dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = `${dia.toString().padStart(2, '0')}-${(mes + 1)
        .toString().padStart(2, '0')}-${ano}`;

      this.diasMes.push({ data });
    }

    // Aplicando status de serviço aberto/fechado
    this.aplicarStatusAgendamentos();
  }

  aplicarStatusAgendamentos() {
    this.agendamentos.forEach(agendamento => {
      const dataInicial = this.formatarData(agendamento.dataInicial);
      const dataFinal = this.formatarData(agendamento.dataFinal);

      this.diasMes.forEach(dia => {
        if (dia.data === dataInicial) {
          dia.status = 'aberto';
        }
        if (dia.data === dataFinal) {
          dia.status = 'fechado';
        }
      });
    });
  }

  formatarData(dataISO: string): string {
    const data = new Date(dataISO);
    return `${data.getDate().toString().padStart(2, '0')}-${(data.getMonth() + 1)
      .toString().padStart(2, '0')}-${data.getFullYear()}`;
  }

  // carregarAgendamentos() {
  //   this.agendamentoService.getAgendamento().subscribe(response => {

  //     // Verifique se a resposta contém um array ou um objeto com as informações de agendamento
  //     if (response && Array.isArray(response)) {
  //       this.agendamentos = response;  // Aqui, se a resposta for um array, podemos atribuí-la diretamente
  //       this.gerarCalendario();
  //     } else if (response && typeof response === 'object') {
  //       // Caso contrário, verifique se a resposta é um objeto
  //       this.agendamentos = [response];  // Se for um objeto, transformamos em um array
  //       console.log('Resposta do backend:', this.agendamentos);  // Log para depuração
  //       this.gerarCalendario();
  //     } else {
  //       console.error('Erro: dados retornados não são válidos ou não contém agendamentos');
  //       this.agendamentos = [];
  //     }
  //   }, error => {
  //     console.error('Erro ao carregar agendamentos', error);
  //     this.agendamentos = [];
  //   });
  // }

  // gerarCalendario() {
  //   this.diasMes = [];
  //   const ano = 2025;
  //   const mes = 3; // Março (por exemplo)
  //   const diasNoMes = new Date(ano, mes, 0).getDate();

  //   for (let i = 1; i <= diasNoMes; i++) {
  //     const dataAtual = new Date(ano, mes - 1, i);
  //     let status = 'livre';

  //     for (const agendamento of this.agendamentos) {
  //       const dataInicial = new Date(agendamento.dataInicial);
  //       const dataFinal = new Date(agendamento.dataFinal);

  //       // Verifica se o dia atual está dentro do intervalo de agendamento
  //       if (dataAtual >= dataInicial && dataAtual <= dataFinal) {
  //         if (dataAtual.getTime() === dataInicial.getTime()) {
  //           status = 'aberto'; // Servico aberto no primeiro dia do intervalo
  //         } else if (dataAtual.getTime() === dataFinal.getTime()) {
  //           status = 'fechado'; // Servico fechado no último dia do intervalo
  //         } else if (dataAtual > dataInicial && dataAtual < dataFinal) {
  //           // Se for um dia entre a data inicial e final
  //           status = 'fechado'; // Considera como "fechado" no meio do intervalo
  //         }
  //       }
  //     }

  //     this.diasMes.push({ data: dataAtual.toISOString().split('T')[0], status });
  //   }
  // }

  // stringParaData(dataStr: string): Date {
  //   const dia = parseInt(dataStr.substring(0, 2), 10);
  //   const mes = parseInt(dataStr.substring(2, 4), 10) - 1;
  //   const ano = parseInt(dataStr.substring(4, 8), 10);
  //   return new Date(ano, mes, dia);
  // }

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
