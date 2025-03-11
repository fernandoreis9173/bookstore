import { Component } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { CurriculoService } from 'src/app/services/curriculo.service.ts.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  totalCurriculo: number = 0;

  currentYear: number = new Date().getFullYear(); // Ano atual
  currentMonth: number = new Date().getMonth(); // Mês atual (0 = Janeiro)
  years: number[] = []; // Lista de anos disponíveis

  diasMes: any[] = [];
  agendamentos = [];

  constructor(
    public menuService: MenuService,
    public curriculoService: CurriculoService,
    private agendamentoService: AgendamentoService
  ) {
    this.carregarAnos();
    this.gerarDiasDoMes(this.currentYear, this.currentMonth);
  }

  ngOnInit() {
    const hoje = new Date();
    this.currentYear = hoje.getFullYear();
    this.currentMonth = hoje.getMonth() + 1; // 🔥 Ajuste para começar com 1
    this.atualizarCalendario();
    this.gerarDiasDoMes(this.currentYear, this.currentMonth);
    this.menuService.menuSelecionado = 1;
    this.getTotalCurriculo();
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.getAgendamento().subscribe(
      (data) => {
        // Mapeia apenas os campos necessários
        this.agendamentos = data.result.map((item: any) => ({
          dataInicial: item.dataInicial,
          dataFinal: item.dataFinal,
        }));

        this.gerarDiasDoMes(this.currentYear, this.currentMonth); // Março (mês 2, pois janeiro = 0)
      },
      (error) => {
        console.error('Erro ao buscar agendamentos', error);
      }
    );
  }

  carregarAnos() {
    const anoInicial = 2020;
    for (let ano = anoInicial; ano <= this.currentYear; ano++) {
      this.years.push(ano);
    }
  }

  gerarDiasDoMes(ano: number, mes: number) {
    this.diasMes = []; // Resetando os dias ao trocar o mês

    const diasNoMes = new Date(ano, mes, 0).getDate(); // Obtém o número de dias do mês corretamente

    for (let dia = 1; dia <= diasNoMes; dia++) {
      // Ajustando para garantir que o mês esteja correto (01-12)
      const data = `${dia.toString().padStart(2, '0')}-${mes
        .toString()
        .padStart(2, '0')}-${ano}`;

      this.diasMes.push({ data });
    }

    this.aplicarStatusAgendamentos(); // Atualiza os status de agendamentos
  }

  // 📌 Atualiza o calendário quando o usuário altera mês/ano
  atualizarCalendario() {
    this.gerarDiasDoMes(this.currentYear, this.currentMonth);
  }

  aplicarStatusAgendamentos() {
    this.agendamentos.forEach((agendamento) => {
      const dataInicial = this.formatarData(agendamento.dataInicial);
      const dataFinal = this.formatarData(agendamento.dataFinal);

      this.diasMes.forEach((dia) => {
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
    return `${data.getDate().toString().padStart(2, '0')}-${(
      data.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${data.getFullYear()}`;
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
