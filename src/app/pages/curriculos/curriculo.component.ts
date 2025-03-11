import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { CurriculoService } from 'src/app/services/curriculo.service.ts.service';
import { Curriculos } from 'src/app/models/curriculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.scss'],
})
export class CurriculoComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListCurriculo: Array<Curriculos>;
   originalListCurriculos: Curriculos[] = []; // Lista original salva
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  isSearchActive: boolean = false;

  ngOnInit() {
    this.getCurriculo();
    this.menuService.menuSelecionado = 3;

    this.configpag();

    this.curriculoForm = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      idade: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      proximo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      tempoMoradia: ['', [Validators.required]],
      tempocidade: ['', [Validators.required]],
      moradiaAntes: ['', [Validators.required]],
      casaPropria: ['', [Validators.required]],
      valorAluguel: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      foneRecador: ['', [Validators.required]],
      localNascimento: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      orgaoEmissor: ['', [Validators.required]],
      rgestado: ['', [Validators.required]],
      dataEmissao: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      tituloEleitor: ['', [Validators.required]],
      zonaEleitoral: ['', [Validators.required]],
      secaoEleitoral: ['', [Validators.required]],
      numeroCarteiraProfissional: ['', [Validators.required]],
      serieCarteiraProfissional: ['', [Validators.required]],
      ufCarteiraProfissional: ['', [Validators.required]],
      numeroCarteiraMotorista: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      pis: ['', [Validators.required]],
      nomePais: ['', [Validators.required]],
      nomeMae: ['', [Validators.required]],
      filhos: ['', [Validators.required]],
      idadeFilhos: ['', [Validators.required]],
    });
  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private curriculoService: CurriculoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina,
    };
  }

  isInvalidField(field: string): boolean {
    return this.curriculoForm.get(field)?.invalid &&
           (this.curriculoForm.get(field)?.dirty || this.curriculoForm.get(field)?.touched);
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
    this.curriculoForm.reset();
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

  getCurriculo() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.curriculoService.getCurriculo().subscribe(
      (response: any) => {

        if (response.result) {
          this.tableListCurriculo = response.result;
          this.originalListCurriculos = [...response.result];
        } else {
          console.error(
            'A propriedade "result" não existe no objeto de resposta.'
          );
        }

        this.tableListCurriculo = response.result;
      },
      (error) => console.error(error),
      () => {}
    );
  }

  searchTable(event: any): void {
    const searchTerm = event.target.value.toLowerCase().trim();
    this.isSearchActive = searchTerm.length > 0;

    if (!this.isSearchActive) {
      this.tableListCurriculo = [...this.originalListCurriculos]; // Restaura a lista original
      return;
    }

    this.tableListCurriculo = this.originalListCurriculos.filter(agendamento =>
      Object.values(agendamento).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm)
      )
    );
  }

  curriculoForm: FormGroup;



  get dadosForm() {
    return this, this.curriculoForm.controls;
  }

  enviar() {

    if (this.curriculoForm.invalid) {
      this.curriculoForm.markAllAsTouched(); // Exibe os erros nos campos obrigatórios
      return; // Interrompe o envio até que o formulário esteja válido
    }


    const { id, ...curriculoData } = {
      id: this.curriculoForm.value.id,
      nome: this.curriculoForm.value.nome,
      idade: this.curriculoForm.value.idade,
      endereco: this.curriculoForm.value.endereco,
      bairro: this.curriculoForm.value.bairro,
      cidade: this.curriculoForm.value.cidade,
      proximo: this.curriculoForm.value.proximo,
      estado: this.curriculoForm.value.estado,
      tempoMoradia: this.curriculoForm.value.tempoMoradia,
      tempocidade: this.curriculoForm.value.tempocidade,
      moradiaAntes: this.curriculoForm.value.moradiaAntes,
      casaPropria: this.curriculoForm.value.casaPropria,
      valorAluguel: this.curriculoForm.value.valorAluguel,
      telefone: this.curriculoForm.value.telefone,
      celular: this.curriculoForm.value.celular,
      foneRecador: this.curriculoForm.value.foneRecador,
      localNascimento: this.curriculoForm.value.localNascimento,
      dataNascimento: this.curriculoForm.value.dataNascimento,
      rg: this.curriculoForm.value.rg,
      orgaoEmissor: this.curriculoForm.value.orgaoEmissor,
      rgestado: this.curriculoForm.value.rgestado,
      dataEmissao: this.curriculoForm.value.dataEmissao,
      cpf: this.curriculoForm.value.cpf,
      tituloEleitor: this.curriculoForm.value.tituloEleitor,
      zonaEleitoral: this.curriculoForm.value.zonaEleitoral,
      secaoEleitoral: this.curriculoForm.value.secaoEleitoral,
      numeroCarteiraProfissional: this.curriculoForm.value.numeroCarteiraProfissional,
      serieCarteiraProfissional: this.curriculoForm.value.serieCarteiraProfissional,
      ufCarteiraProfissional: this.curriculoForm.value.ufCarteiraProfissional,
      numeroCarteiraMotorista: this.curriculoForm.value.numeroCarteiraMotorista,
      categoria: this.curriculoForm.value.categoria,
      pis: this.curriculoForm.value.pis,
      nomePais: this.curriculoForm.value.nomePais,
      nomeMae: this.curriculoForm.value.nomeMae,
      filhos: this.curriculoForm.value.filhos,
      idadeFilhos: this.curriculoForm.value.idadeFilhos,
    };

    const obj = this.itemEdicao ? { id, ...curriculoData } : curriculoData;

    if (this.itemEdicao) {
      this.curriculoService.UpdateCurriculo(obj).subscribe(
        () => {
          this.snackBar.open('Registry changed successfully.', 'Close', {
            duration: 2000,
          });
          this.curriculoForm.reset();
          this.getCurriculo();
        },
        (error) => {
          console.error('Erro ao enviar:', error);
          this.snackBar.open('Registry not changed', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.curriculoService.registerCurriculo(obj).subscribe(
        (response: any) => { // O backend deve retornar o ID cadastrado
          this.snackBar.open('Registration completed successfully.', 'Close', {
            duration: 2000,
          });

          const idCurriculo = response.id; // Pegando o ID retornado pelo backend

          // Redirecionar para a tela de escolaridade com o ID
          this.router.navigate(['/escolaridade', idCurriculo]);

          this.getCurriculo();
          this.curriculoForm.reset();
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

  itemEdicao: Curriculos;
  edicao(id: number) {
    this.curriculoService.obterCurriculo(id).subscribe(
      (response: Curriculos) => {
        if (response) {
          this.itemEdicao = response;
          this.tipoTela = 2;

          var dados = this.dadosForm;
          dados['id'].setValue(this.itemEdicao.id);
          dados['nome'].setValue(this.itemEdicao.nome);
          dados['idade'].setValue(this.itemEdicao.idade);
          dados['endereco'].setValue(this.itemEdicao.endereco);
          dados['bairro'].setValue(this.itemEdicao.bairro);
          dados['cidade'].setValue(this.itemEdicao.cidade);
          dados['proximo'].setValue(this.itemEdicao.proximo);
          dados['estado'].setValue(this.itemEdicao.estado);
          dados['tempoMoradia'].setValue(this.itemEdicao.tempoMoradia);
          dados['tempocidade'].setValue(this.itemEdicao.tempocidade);
          dados['moradiaAntes'].setValue(
            this.itemEdicao.moradiaAntes
          );
          dados['casaPropria'].setValue(
            this.itemEdicao.casaPropria
          );
          dados['valorAluguel'].setValue(
            this.itemEdicao.valorAluguel
          );
          dados['telefone'].setValue(this.itemEdicao.telefone);
          dados['celular'].setValue(this.itemEdicao.celular);
          dados['foneRecador'].setValue(this.itemEdicao.foneRecador);
          dados['localNascimento'].setValue(
            this.itemEdicao.localNascimento
          );
          dados['dataNascimento'].setValue(
            this.itemEdicao.dataNascimento
          );
          dados['rg'].setValue(this.itemEdicao.rg);
          dados['orgaoEmissor'].setValue(this.itemEdicao.orgaoEmissor);
          dados['rgestado'].setValue(this.itemEdicao.rgestado);
          dados['dataEmissao'].setValue(this.itemEdicao.dataEmissao);
          dados['cpf'].setValue(this.itemEdicao.cpf);
          dados['tituloEleitor'].setValue(
            this.itemEdicao.tituloEleitor
          );
          dados['zonaEleitoral'].setValue(this.itemEdicao.zonaEleitoral);
          dados['secaoEleitoral'].setValue(this.itemEdicao.secaoEleitoral);
          dados['numeroCarteiraProfissional'].setValue(
            this.itemEdicao.numeroCarteiraProfissional
          );
          dados['serieCarteiraProfissional'].setValue(
            this.itemEdicao.serieCarteiraProfissional
          );
          dados['ufCarteiraProfissional'].setValue(
            this.itemEdicao.ufCarteiraProfissional
          );
          dados['numeroCarteiraMotorista'].setValue(
            this.itemEdicao.numeroCarteiraMotorista
          );
          dados['categoria'].setValue(
            this.itemEdicao.categoria
          );
          dados['pis'].setValue(this.itemEdicao.pis);
          dados['nomePais'].setValue(this.itemEdicao.nomePais);
          dados['nomeMae'].setValue(this.itemEdicao.nomeMae);
          dados['filhos'].setValue(this.itemEdicao.filhos);
          dados['idadeFilhos'].setValue(this.itemEdicao.idadeFilhos);
        }
      },
      (error) => console.error(error),
      () => {}
    );
  }
  cancelarEdicao(): void {
    this.getCurriculo();
  }

  onDeleteCurriculo(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this curriculo?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.curriculoService.deleteCurriculo(id).subscribe(
          () => {
            this.snackBar.open('Registration deleted successfully.', 'Close', {
              duration: 2000,
            });
            this.getCurriculo();
            this.curriculoForm.reset();
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
