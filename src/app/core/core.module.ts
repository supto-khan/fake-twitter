import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpInterceptor } from './http.Interceptor';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, NgxWebstorageModule.forRoot()],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
