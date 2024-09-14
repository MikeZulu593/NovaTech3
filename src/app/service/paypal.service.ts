import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface WebProfile {
  id: string;
  name: string;
  temporary: boolean;
  presentation: {
    logo_image: string;
  },
  input_fields: {
    no_shipping: boolean;
    address_override: boolean;
  },
  flow_config: {
    landing_page_type: string;
    bank_txn_pending_url: string;
  }
}

export interface Payment {
  id: string;
  create_time: string;
  update_time: string;
  intent: string;
  payer: {
    payment_method: string;
    payer_info: {
      shipping_address: {

      }
    }
  }
  transactions: {
    amount: {
      total: string;
      currency: string;
      details: {
        subtotal: string;
        tax: string;
        shipping: string;
      }
    }
    description: string;
    item_list: {
      items: {
        name: string;
        sku: string;
        price: string;
        currency: string;
        quantity: string;
      },
      shipping_address: {
        recipient_name: string;
        line1: string;
        line2: string;
        city: string;
        state: string;
        postal_code: string;
        country_code: string;
        phone: string;
      }
    }
  }[],
  links: {
    href: string;
    rel: string;
    method: string;
  }[],
}

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  urlToken = 'https://api.sandbox.paypal.com/v1/oauth2/token';
  urlPaymentExperience = 'https://api-m.sandbox.paypal.com/v1/payment-experience/web-profiles/';
  urlPayment = 'https://api-m.sandbox.paypal.com/v1/payments/payment';
  private clientId = "";
  private secret = ""; //ELIMINÉ PARA PODER SUBIR A GITHUB

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<AccessToken> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.secret}`),
      'Accept-Language': 'en_US'
    });
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    return this.http.post<AccessToken>(this.urlToken, body.toString(), { headers });
  }

  createWebProfile(accessToken: string, name: string): Observable<WebProfile> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const body = {
      name,
      presentation: {
        logo_image: 'https://www.paypal.com'
      },
      input_fields: {
        no_shipping: 1,
        address_override: 1
      },
      flow_config: {
        landing_page_type: 'billing',
        bank_txn_pending_url: 'https://www.paypal.com'
      }
    };

    return this.http.post<WebProfile>(this.urlPaymentExperience, body, { headers });
  }

  createPayment(
    accessToken: string, 
    experience_profile_id: string, 
    return_url: string, 
    cancel_url: string,
    total: number,
  ): Observable<Payment> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const totalString = total.toString();

    const body = {
      intent: 'authorize',
      experience_profile_id,
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: totalString,
          details: {
            shipping: '0',
            subtotal: totalString,
            tax: '0'
          }
        },
        payee: {
          email: 'flihtwatcher17@gmail.com'
        },
        description: 'Pago por consumos en NovaTech',
        item_list: {
          items: [
            {
              name: 'Artículos varios',
              quantity: '2',
              price: totalString,
              sku: '1',
              currency: 'USD'
            },
          ],
          shipping_address: {
            recipient_name: 'Betsy customer',
            line1: '2855 Collins Avenue',
            city: 'Miami',
            country_code: 'US',
            postal_code: '95070',
            phone: '0116519999164',
            state: 'FL',
          }
        }
      }],
      redirect_urls: {
        return_url,
        cancel_url
      }
    };

    return this.http.post<Payment>(this.urlPayment, body, { headers });
  }

}