import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Escolaridade } from 'src/app/models/escolaridade';
import { EscolaridadeService } from 'src/app/services/escolaridade.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss'],
})
export class EscolaridadeComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListEscolaridade: Array<Escolaridade>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;
  idCurriculo: string;

  isSerieFundamentalDisabled: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idCurriculo = params.get('id'); // Obtendo o ID da URL
    });
    this.getEscolaridade();
    this.menuService.menuSelecionado = 3;

    this.configpag();

    this.EscolaridadeForm = this.formBuilder.group({
      id: [''],
      fundamCompleto: ['', [Validators.required]],
      serieFundamental: [''],
      medioCompleto: ['', [Validators.required]],
      serieMedio: [''],
      superior: ['', [Validators.required]],
      cursoSuperior: [''],
      pretendeCursar: ['', [Validators.required]],
      horario: [''],
      local: [''],
    });
  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private EscolaridadeService: EscolaridadeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
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

  onFundamentalChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.isSerieFundamentalDisabled = value === '0'; // Desativa se for "Não"

    if (this.isSerieFundamentalDisabled) {
      this.EscolaridadeForm.get('serieFundamental')?.setValue(''); // Reseta o campo
    }
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
    this.EscolaridadeForm.reset();
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

  getEscolaridade() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.EscolaridadeService.getEscolaridade().subscribe(
      (response: any) => {

        if (response.result) {
          this.tableListEscolaridade = response.result;
        } else {
          console.error(
            'A propriedade "result" não existe no objeto de resposta.'
          );
        }

        this.tableListEscolaridade = response.result;
      },
      (error) => console.error(error),
      () => {}
    );
  }

  EscolaridadeForm: FormGroup;

  get dadosForm() {
    return this, this.EscolaridadeForm.controls;
  }

  enviar() {
    const { id, ...EscolaridadeData } = {
      id: this.EscolaridadeForm.value.id,
      fundamCompleto: this.EscolaridadeForm.value.fundamCompleto === 'true' ? true : false,
      serieFundamental: this.EscolaridadeForm.value.serieFundamental,
      medioCompleto: this.EscolaridadeForm.value.medioCompleto === 'true' ? true : false,
      serieMedio: this.EscolaridadeForm.value.serieMedio,
      superior: this.EscolaridadeForm.value.superior === 'true' ? true : false,
      cursoSuperior: this.EscolaridadeForm.value.cursoSuperior,
      pretendeCursar: this.EscolaridadeForm.value.pretendeCursar,
      horario: this.EscolaridadeForm.value.horario,
      local: this.EscolaridadeForm.value.local,
      curriculoId: Number(this.idCurriculo),

      // curriculo: this.EscolaridadeForm.value.casaPropria,
    };

    const obj = this.itemEdicao ? { id, ...EscolaridadeData } : EscolaridadeData;

    if (this.itemEdicao) {
      this.EscolaridadeService.UpdateEscolaridade(obj).subscribe(
        () => {
          this.snackBar.open('Registry changed successfully.', 'Close', {
            duration: 2000,
          });
          this.EscolaridadeForm.reset();
          this.getEscolaridade();
        },
        (error) => {
          console.error('Erro ao enviar:', error);
          this.snackBar.open('Registry not changed', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.EscolaridadeService.registerEscolaridade(obj).subscribe(
        () => {
          this.snackBar.open('Registration completed successfully.', 'Close', {
            duration: 2000,
          });

          this.router.navigate(['/lastjob', this.idCurriculo]);

          this.getEscolaridade();
          this.EscolaridadeForm.reset();
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

  itemEdicao: Escolaridade;
  edicao(id: number) {
    this.EscolaridadeService.obterEscolaridade(id).subscribe(
      (response: Escolaridade) => {
        if (response) {
          this.itemEdicao = response;
          this.tipoTela = 2;

          var dados = this.dadosForm;
          dados['id'].setValue(this.itemEdicao.id);
          // dados['nome'].setValue(this.itemEdicao.nome);
          // dados['idade'].setValue(this.itemEdicao.idade);
          // dados['endereco'].setValue(this.itemEdicao.endereco);
          // dados['bairro'].setValue(this.itemEdicao.bairro);
          // dados['cidade'].setValue(this.itemEdicao.cidade);
          // dados['proximo'].setValue(this.itemEdicao.proximo);
          // dados['estado'].setValue(this.itemEdicao.estado);
          // dados['tempoMoradia'].setValue(this.itemEdicao.tempoMoradia);
          // dados['tempocidade'].setValue(this.itemEdicao.tempocidade);
          // dados['moradiaAntes'].setValue(
          //   this.itemEdicao.moradiaAntes
          // );
          // dados['casaPropria'].setValue(
          //   this.itemEdicao.casaPropria
          // );
          // dados['valorAluguel'].setValue(
          //   this.itemEdicao.valorAluguel
          // );
          // dados['telefone'].setValue(this.itemEdicao.telefone);
          // dados['celular'].setValue(this.itemEdicao.celular);
          // dados['foneRecador'].setValue(this.itemEdicao.foneRecador);
          // dados['localNascimento'].setValue(
          //   this.itemEdicao.localNascimento
          // );
          // dados['dataNascimento'].setValue(
          //   this.itemEdicao.dataNascimento
          // );
          // dados['rg'].setValue(this.itemEdicao.rg);
          // dados['orgaoEmissor'].setValue(this.itemEdicao.orgaoEmissor);
          // dados['rgestado'].setValue(this.itemEdicao.rgestado);
          // dados['dataEmissao'].setValue(this.itemEdicao.dataEmissao);
          // dados['cpf'].setValue(this.itemEdicao.cpf);
          // dados['tituloEleitor'].setValue(
          //   this.itemEdicao.tituloEleitor
          // );
          // dados['zonaEleitoral'].setValue(this.itemEdicao.zonaEleitoral);
          // dados['secaoEleitoral'].setValue(this.itemEdicao.secaoEleitoral);
          // dados['numeroCarteiraProfissional'].setValue(
          //   this.itemEdicao.numeroCarteiraProfissional
          // );
          // dados['serieCarteiraProfissional'].setValue(
          //   this.itemEdicao.serieCarteiraProfissional
          // );
          // dados['ufCarteiraProfissional'].setValue(
          //   this.itemEdicao.ufCarteiraProfissional
          // );
          // dados['numeroCarteiraMotorista'].setValue(
          //   this.itemEdicao.numeroCarteiraMotorista
          // );
          // dados['categoria'].setValue(
          //   this.itemEdicao.categoria
          // );
          // dados['pis'].setValue(this.itemEdicao.pis);
          // dados['nomePais'].setValue(this.itemEdicao.nomePais);
          // dados['nomeMae'].setValue(this.itemEdicao.nomeMae);
          // dados['filhos'].setValue(this.itemEdicao.filhos);
          // dados['idadeFilhos'].setValue(this.itemEdicao.idadeFilhos);
        }
      },
      (error) => console.error(error),
      () => {}
    );
  }
  cancelarEdicao(): void {
    this.getEscolaridade();
  }

  onDeleteEscolaridade(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Escolaridade?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.EscolaridadeService.deleteEscolaridade(id).subscribe(
          () => {
            this.snackBar.open('Registration deleted successfully.', 'Close', {
              duration: 2000,
            });
            this.getEscolaridade();
            this.EscolaridadeForm.reset();
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
