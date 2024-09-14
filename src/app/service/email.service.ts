import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://api.brevo.com/v3/smtp/email';
  private apiKey = ''; //LO ELIMINÉ PARA NO TENER PROBLEMAS CON GITHUB
  constructor(private http: HttpClient) {}

  sendEmail(toEmail: string, toName: string, subject: string, htmlContent: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'api-key': this.apiKey,
      'content-type': 'application/json'
    });

    const body = {
      sender: {
        name: 'NovaTech Enterprises',
        email: 'no-reply@myshop.com'
      },
      replyTo: {
        email: 'enieto@itsqmet.edu.ec'
      },
      to: [
        {
          email: toEmail,
          name: toName
        }
      ],
      htmlContent: `<!DOCTYPE html> <html> <body> 
                      <h1>Gracias por preferir NovaTech</h1> 
                      <p>Su pedido se está procesando, contáctese con nosotros en caso de requerir asistencia </p>
                    </body> </html>`,
      subject: 'NovaTech - Compra exitosa!'
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
