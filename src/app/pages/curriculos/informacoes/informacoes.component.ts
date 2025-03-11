import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { InformacoesService } from 'src/app/services/informacoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Informacoes } from 'src/app/models/informacoes';

@Component({
  selector: 'app-informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.scss'],
})
export class InformacoesComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListInformacoes: Array<Informacoes>;
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
    this.getInformacoes();
    this.menuService.menuSelecionado = 3;

    this.configpag();

    this.InformacoesForm = this.formBuilder.group({
      id: [''],
      pqJobAgencia: ['', [Validators.required]],
      pqIndicar: [''],
      oqFazMelhor: ['', [Validators.required]],
      gostaLavarRoupa: [''],
      sabePassarRoupa: ['', [Validators.required]],
      gostaLimpeza: [''],
      comoLimpa: ['', [Validators.required]],
      gostaCozinhar: [''],
      oqCozinha: [''],
      gostaCrianca: [''],
      religiao: [''],
      pernoite: [''],
      morarEmprego: [''],
      empregoAtual: [''],
      gostaAnimal: [''],
      alergiaAnimal: [''],
      fuma: [''],
      diabetes: [''],
      hipertensao: [''],
      depressao: [''],
      colesterol: [''],
      problemaCardiaco: [''],
      problemaColuna: [''],
      visaoAudicao: [''],
      alergiaOutros: [''],
      examesQuais: [''],
      uniforme: [''],
      trabalharOutraCidade: [''],
    });
  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private InformacoesService: InformacoesService,
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
      this.InformacoesForm.get('serieFundamental')?.setValue(''); // Reseta o campo
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
    this.InformacoesForm.reset();
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

  getInformacoes() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.InformacoesService.getInformacoes().subscribe(
      (response: any) => {

        if (response.result) {
          this.tableListInformacoes = response.result;
        } else {
          console.error(
            'A propriedade "result" não existe no objeto de resposta.'
          );
        }

        this.tableListInformacoes = response.result;
      },
      (error) => console.error(error),
      () => {}
    );
  }

  InformacoesForm: FormGroup;

  get dadosForm() {
    return this, this.InformacoesForm.controls;
  }

  enviar() {
    const { id, ...InformacoesData } = {
      id: this.InformacoesForm.value.id,
      pqJobAgencia: this.InformacoesForm.value.pqJobAgencia,
      pqIndicar: this.InformacoesForm.value.pqIndicar,
      oqFazMelhor: this.InformacoesForm.value.oqFazMelhor,
      gostaLavarRoupa: this.InformacoesForm.value.gostaLavarRoupa === 'true' ? 'Sim' : "Não",
      sabePassarRoupa: this.InformacoesForm.value.sabePassarRoupa === 'true' ? 'Sim' : "Não",
      gostaLimpeza: this.InformacoesForm.value.gostaLimpeza === 'true' ? 'Sim' : "Não",
      comoLimpa: this.InformacoesForm.value.comoLimpa,
      gostaCozinhar: this.InformacoesForm.value.gostaCozinhar === 'true' ? 'Sim' : "Não",
      oqCozinha: this.InformacoesForm.value.oqCozinha,
      gostaCrianca: this.InformacoesForm.value.gostaCrianca === 'true' ? 'Sim' : "Não",
      religiao: this.InformacoesForm.value.religiao,
      pernoite: this.InformacoesForm.value.pernoite === 'true' ? 'Sim' : "Não",
      morarEmprego: this.InformacoesForm.value.morarEmprego,
      empregoAtual: this.InformacoesForm.value.empregoAtual,
      gostaAnimal: this.InformacoesForm.value.gostaAnimal === 'true' ? 'Sim' : "Não",
      alergiaAnimal: this.InformacoesForm.value.alergiaAnimal === 'true' ? 'Sim' : "Não",
      fuma: this.InformacoesForm.value.fuma === 'true' ? 'Sim' : "Não",
      diabetes: this.InformacoesForm.value.diabetes === 'true' ? 'Sim' : "Não",
      hipertensao: this.InformacoesForm.value.hipertensao === 'true' ? 'Sim' : "Não",
      depressao: this.InformacoesForm.value.depressao === 'true' ? 'Sim' : "Não",
      colesterol: this.InformacoesForm.value.colesterol === 'true' ? 'Sim' : "Não",
      problemaCardiaco: this.InformacoesForm.value.problemaCardiaco === 'true' ? 'Sim' : "Não",
      problemaColuna: this.InformacoesForm.value.problemaColuna === 'true' ? 'Sim' : "Não",
      visaoAudicao: this.InformacoesForm.value.visaoAudicao === 'true' ? 'Sim' : "Não",
      alergiaOutros: this.InformacoesForm.value.alergiaOutros === 'true' ? 'Sim' : "Não",
      examesQuais: this.InformacoesForm.value.examesQuais,
      uniforme: this.InformacoesForm.value.uniforme,
      trabalharOutraCidade: this.InformacoesForm.value.trabalharOutraCidade,
      curriculoId: Number(this.idCurriculo),

      // curriculo: this.InformacoesForm.value.casaPropria,
    };

    const obj = this.itemEdicao ? { id, ...InformacoesData } : InformacoesData;

    if (this.itemEdicao) {
      this.InformacoesService.UpdateInformacoes(obj).subscribe(
        () => {
          this.snackBar.open('Registry changed successfully.', 'Close', {
            duration: 2000,
          });
          this.InformacoesForm.reset();
          this.getInformacoes();
        },
        (error) => {
          console.error('Erro ao enviar:', error);
          this.snackBar.open('Registry not changed', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.InformacoesService.registerInformacoes(obj).subscribe(
        () => {
          this.snackBar.open('Registration completed successfully.', 'Close', {
            duration: 2000,
          });

          this.router.navigate(['/curriculos']);

          this.getInformacoes();
          this.InformacoesForm.reset();
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

  itemEdicao: Informacoes;
  edicao(id: number) {
    this.InformacoesService.obterInformacoes(id).subscribe(
      (response: Informacoes) => {
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
    // this.getInformacoes();
    this.router.navigate(['/curriculos']);
  }

  onDeleteInformacoes(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Informacoes?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.InformacoesService.deleteInformacoes(id).subscribe(
          () => {
            this.snackBar.open('Registration deleted successfully.', 'Close', {
              duration: 2000,
            });
            this.getInformacoes();
            this.InformacoesForm.reset();
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
