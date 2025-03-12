import { Agendamento } from './../../models/agendamento';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { FinanceiroService } from 'src/app/services/financeiro.service';
import { ParceirosService } from 'src/app/services/parceiros.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
})
export class FinanceiroComponent {


  receitaDiaria: number = 0;
  receitaMensal: number = 0;
  receitaAnual: number = 0;
  receitaTotal: number = 0;
  despesasTotal: number = 0;
  receitaDiariaTotal: number = 0;
  receitaSemanalTotal: number = 0;
  receitaAnualTotal: number = 0;
  lucroLiquido: number = 0;

  dataInicial: string = '2025-03-02T04:00:00.000Z';
  dataFinal: string = '2025-03-05T04:00:00.000Z';


  constructor(private financeiroService: FinanceiroService) {}

  enviar(): void {
    if (this.dataInicial && this.dataFinal) {
      // Chama o método do serviço e passa as datas selecionadas
      this.financeiroService.getFinanceiro(this.dataInicial, this.dataFinal).subscribe((response: any) => {
        console.log("verificando response", response.result);

        if (response.result) {
          this.receitaDiaria = response.result.receitaDiariaTotal;
          this.receitaSemanalTotal = response.result.receitaSemanalTotal;
          this.receitaAnualTotal = response.result.receitaAnualTotal;
          this.receitaDiariaTotal = response.result.receitaDiariaTotal;
      this.despesasTotal = response.result.despesasTotal;
      this.lucroLiquido = response.result.lucroLiquido;
      this.receitaTotal = response.result.receitaTotal;
        }
      });
    } else {
      alert('Por favor, selecione as datas!');
    }
  }

  downloadTabela() {
    const csvData = [
      ['Descricao', 'Valor (R$)'],
      ['Receita Total', this.receitaTotal],
      ['Despesas Total', this.despesasTotal],
      ['Lucro Liquido', this.lucroLiquido],
      ['Receitas por Periodo', ''],
      ['Receita Diaria Total', this.receitaDiariaTotal],
      ['Receita Semanal Total', this.receitaSemanalTotal],
      ['Receita Anual Total', this.receitaAnualTotal],
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + csvData.map(e => e.join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "resumo_financeiro.csv");
    document.body.appendChild(link);
    link.click();
  }
}
