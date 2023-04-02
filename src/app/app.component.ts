import { Component, inject, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-documentos';
  appService = inject(AppService);
  adjuntoCargado!: File;
  nombrePersonalizadoControl: FormControl = new FormControl();
  displayedColumns: string[] = ['nombrePersonalizado', 'nombreReal', 'extension', 'archivo', 'mimeType', 'options'];
  dataSource: any[] = [];
  dataSourceFiltrado: any[] = [];

  filtroNombrePersonalizado: FormControl = new FormControl();

  constructor() {
    this.appService.getDocumentos().subscribe(res => {
      this.dataSource = [...res]
      this.dataSourceFiltrado = [...res]
      console.log(res)
    });
  }

  ngOnInit(): void {
    this.filtroNombrePersonalizado.valueChanges.subscribe(texto => {
      if(texto && texto.length > 1) {
        const textoBuscado = texto.toLowerCase();
        this.dataSourceFiltrado = this.dataSource.filter((x) =>
          
          (x.nombrePersonalizado.toLowerCase().includes(textoBuscado) ||
          x.extension.toLowerCase().includes(textoBuscado) ||
          x.nombreReal.toLowerCase().includes(textoBuscado) ||
          x.mimeType.toLowerCase().includes(textoBuscado))
        );
      } else {
        this.dataSourceFiltrado = [...this.dataSource];
      }
    })
  }

  
  cargarDocumento(event: any): void {
    this.adjuntoCargado = event.target.files[0];
  }


  agregarDocumento(inputFile: HTMLInputElement): void {
    if(!this.nombrePersonalizadoControl.value || !this.adjuntoCargado){
      return;
    }
    this.appService.addDocumento(this.adjuntoCargado, this.nombrePersonalizadoControl.value).subscribe(() => {
      inputFile.value = '';
      this.nombrePersonalizadoControl.setValue(null);
      this.nombrePersonalizadoControl.markAsUntouched();
    });
  }

  editarDocumento(element: any) {

  }

  eliminarDocumento(element: any) {
    this.appService.eliminarDocumentoYAdjunto(element.id, element.archivo);
  }

}
