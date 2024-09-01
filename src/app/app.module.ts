import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//TUVE QUE CREAR ESTE COMPONENTE PORQUE NO SE ESTABA RECONOCIENDO HTTP CLIENT MODULE Y ENCONTRE QUE ESTA ES LA SOLUCION
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, //IMPORTANDO GLOBALMENTE
  ],
  declarations: [],
  bootstrap: []
})
export class AppModule { }
