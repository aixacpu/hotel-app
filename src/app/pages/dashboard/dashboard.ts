import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Dashboard Admin</h1>
    <h2>Clients</h2>
    <ul>
      <li *ngFor="let c of clients">{{ c.nom }} – {{ c.email }}</li>
    </ul>
    <button (click)="addClient()">Ajouter un client test</button>
  `
})
export class AdminDashboardComponent implements OnInit {
  clients: any[] = [];
  api = 'http://localhost:5003/clients';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.api).subscribe(data => this.clients = data);
  }

  addClient() {
    const newC = { nom: 'Nouveau', email: 'new@mail.com', password: '123', telephone: '0000' };
    this.http.post(this.api, newC).subscribe(() => this.ngOnInit());
  }
}

