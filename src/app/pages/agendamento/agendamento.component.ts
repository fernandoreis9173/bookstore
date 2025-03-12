import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ParceirosService } from 'src/app/services/parceiros.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListAgendamento: Array<Agendamento>;
  originalListAgendamento: Agendamento[] = []; // Lista original salva
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  isSearchActive: boolean = false;

  parceiro: any = null;

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina,
    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  cadastro() {
    this.tipoTela = 2;
    this.agendamentoForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPorPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  // searchTableParceiro(event: Event) {
  //   const input = (event.target as HTMLInputElement).value.trim();

  //   if (input.length >= 14) { // Valida se é um CNPJ completo

  //     this.parceiroService.getParceiroByCNPJ(input).subscribe({
  //       next: (parceiro) => {

  //         if (parceiro) {
  //           this.updateParceiroData(parceiro);
  //         } else {
  //           console.warn("Parceiro não encontrado");
  //         }
  //       },
  //       error: (err) => console.error("Erro ao buscar parceiro:", err)
  //     });
  //   }
  // }


  searchTableParceiro(event: any): void {
    const cnpj = event.target.value.trim(); // Obtemos o valor do CNPJ

    if (cnpj.length >= 14) { // Se o CNPJ tem o tamanho esperado (14 dígitos)
      this.parceiroService.getParceiroByCNPJ(cnpj).subscribe(
        (response) => {
          if (response.status === 'ok' && response.parceiro) {
            this.updateParceiroData(response.parceiro); // Preenche os campos com os dados do parceiro
          } else {
            console.warn("Parceiro não encontrado");
            this.resetFormFields(); // Limpa os campos se não encontrar
          }
        },
        (error) => {
          console.error("Erro ao buscar parceiro:", error);
          this.resetFormFields(); // Limpa os campos em caso de erro
        }
      );
    } else {
      this.resetFormFields(); // Limpa os campos se o CNPJ for inválido
    }
  }

  // Função para preencher os campos
  updateParceiroData(parceiro: any): void {
    this.parceiro = parceiro;
    this.agendamentoForm.patchValue({
      turnoHora: parceiro.turno || '',
      cnpj: parceiro.cnpj || '',
      nomePatraos: parceiro.nameEmpresa || '',
      localizacao: parceiro.localizacao || '',
    });
  }

  // Função para limpar os campos
  resetFormFields(): void {
    this.agendamentoForm.reset(); // Limpa os campos
  }


  getAgendamento(): void {
    this.itemEdicao = null;
    this.tipoTela = 1;
    this.agendamentoService.getAgendamento().subscribe((response: any) => {
      if (response.result) {
        this.tableListAgendamento = response.result;
        this.originalListAgendamento = [...response.result]; // Salva a lista original
      }
    });
  }

  searchTable(event: any): void {
    const searchTerm = event.target.value.toLowerCase().trim();
    this.isSearchActive = searchTerm.length > 0;

    if (!this.isSearchActive) {
      this.tableListAgendamento = [...this.originalListAgendamento]; // Restaura a lista original
      return;
    }

    this.tableListAgendamento = this.originalListAgendamento.filter(agendamento =>
      Object.values(agendamento).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm)
      )
    );
  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private agendamentoService: AgendamentoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private parceiroService: ParceirosService
  ) {}

  isInvalidField(field: string): boolean {
    return this.agendamentoForm.get(field)?.invalid &&
           (this.agendamentoForm.get(field)?.dirty || this.agendamentoForm.get(field)?.touched);
  }

  agendamentoForm: FormGroup;

  ngOnInit() {
    this.getAgendamento();
    this.menuService.menuSelecionado = 3;

    this.configpag();

    this.agendamentoForm = this.formBuilder.group({
      id: [''],
      nomeEmpregada: ['', [Validators.required]],
      turnoHora: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      nomePatraos: ['', [Validators.required]],
      dataInicial: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]],
      localizacao: ['', [Validators.required]],
      receita: ['', [Validators.required]],
      despesas: ['', [Validators.required]],
    });
  }

  // searchTable(event: any): void {
  //   const searchTerm = event.target.value.toLowerCase().trim();
  //   this.isSearchActive = searchTerm.length > 0;

  //   if (!this.isSearchActive) {
  //     this.filteredData = [...this.tableData]; // Volta à lista original se a pesquisa estiver vazia
  //     return;
  //   }

  //   this.filteredData = this.tableData.filter(item =>
  //     Object.values(item).some(value =>
  //       value.toString().toLowerCase().includes(searchTerm)
  //     )
  //   );
  // }

  get dadosForm() {
    return this, this.agendamentoForm.controls;
  }

  formatarCNPJ(event: any) {
    let cnpj = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (cnpj.length > 14) {
      cnpj = cnpj.substring(0, 14); // Limita a 14 caracteres
    }

    // Aplica a máscara XX.XXX.XXX/XXXX-XX
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');

    event.target.value = cnpj; // Atualiza o valor no input
  }

  // Função que formata o valor como moeda
  formatarMoeda(event: any): void {
    let valor = event.target.value;

    // Remove qualquer caractere não numérico, exceto vírgula
    valor = valor.replace(/[^\d,]/g, '');

    // Divide o valor em parte inteira e decimal
    let [inteiro, decimal] = valor.split(',');

    // Adiciona separadores de milhar no lado inteiro
    inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Se a parte decimal existir, limita a 2 casas, caso contrário, define como vazio
    decimal = decimal ? decimal.substring(0, 2) : '';

    // Reconstroi o valor com a parte inteira e a parte decimal, com vírgula separando
    valor = inteiro + (decimal ? ',' + decimal : '');

    // Adiciona o prefixo 'R$'
    valor = 'R$ ' + valor;

    event.target.value = valor;
  }

  enviar() {

    if (this.agendamentoForm.invalid) {
      this.agendamentoForm.markAllAsTouched(); // Exibe os erros nos campos obrigatórios
      return; // Interrompe o envio até que o formulário esteja válido
    }

    const { id, ...parceiroData } = {
      id: this.agendamentoForm.value.id,
      nomeEmpregada: this.agendamentoForm.value.nomeEmpregada,
      turnoHora: this.agendamentoForm.value.turnoHora,
      cnpj: this.agendamentoForm.value.cnpj,
      nomePatraos: this.agendamentoForm.value.nomePatraos,
      dataInicial: this.agendamentoForm.value.dataInicial
        ? new Date(this.agendamentoForm.value.dataInicial).toISOString()
        : null,
      dataFinal: this.agendamentoForm.value.dataFinal
        ? new Date(this.agendamentoForm.value.dataFinal).toISOString()
        : null,
      localizacao: this.agendamentoForm.value.localizacao,
      receita: this.agendamentoForm.value.receita,
      despesas: this.agendamentoForm.value.despesas,
    };

    const obj = this.itemEdicao ? { id, ...parceiroData } : parceiroData;

    console.log('pegando o objeto', obj);
    if (this.itemEdicao) {
      this.agendamentoService.UpdateAgendamento(obj).subscribe(
        () => {
          this.snackBar.open('Registry changed successfully.', 'Close', {
            duration: 2000,
          });
          this.agendamentoForm.reset();
          this.getAgendamento();
        },
        (error) => {
          console.error('Erro ao enviar:', error);
          this.snackBar.open('Registry not changed', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.agendamentoService.registerAgendamento(obj).subscribe(
        (response: any) => {
          // O backend deve retornar o ID cadastrado
          this.snackBar.open('Registration completed successfully.', 'Close', {
            duration: 2000,
          });

          this.getAgendamento();
          this.agendamentoForm.reset();
        },
        (error) => {
          console.error('Erro ao enviar:', error);
          this.snackBar.open('Registration not completed', 'Close', {
            duration: 2000,
          });
        }
      );
    }
  }

  itemEdicao: Agendamento;
  edicao(id: number) {
    this.agendamentoService.obterAgendamento(id).subscribe(
      (response: Agendamento) => {
        if (response) {
          this.itemEdicao = response;
          this.tipoTela = 2;

          var dados = this.dadosForm;
          dados['id'].setValue(this.itemEdicao.id);
          dados['nomeEmpregada'].setValue(this.itemEdicao.nomeEmpregada);
          dados['turnoHora'].setValue(this.itemEdicao.turnoHora);
          dados['cnpj'].setValue(this.itemEdicao.cnpj);
          dados['nomePatraos'].setValue(this.itemEdicao.nomePatraos);
          dados['dataInicial'].setValue(this.itemEdicao.dataInicial);
          dados['dataFinal'].setValue(this.itemEdicao.dataFinal);
          dados['localizacao'].setValue(this.itemEdicao.localizacao);
          dados['receita'].setValue(this.itemEdicao.receita);
          dados['despesas'].setValue(this.itemEdicao.despesas);
        }
      },
      (error) => console.error(error),
      () => {}
    );
  }
  cancelarEdicao(): void {
    this.getAgendamento();
  }

  onDeleteAgendamento(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Agendamento?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.agendamentoService.deleteAgendamento(id).subscribe(
          () => {
            this.snackBar.open('Registration deleted successfully.', 'Close', {
              duration: 2000,
            });
            this.getAgendamento();
            this.agendamentoForm.reset();
          },
          (error) => {
            console.error('Erro ao enviar:', error);
            this.snackBar.open('Registration not deleted', 'Close', {
              duration: 2000,
            });
          }
        );
      }
    });
  }
}
