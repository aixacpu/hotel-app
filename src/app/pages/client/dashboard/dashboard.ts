import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Mes Réservations</h1>
    <table>
      <thead>
        <tr><th>Chambre</th><th>Date début</th><th>Date fin</th><th>État</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let r of myRes">
          <td>{{ r.chambreId }}</td>
          <td>{{ r.dateDebut }}</td>
          <td>{{ r.dateFin }}</td>
          <td>{{ r.etat }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class ClientDashboardComponent implements OnInit {
  api = 'http://localhost:5003';
  myRes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const myId = localStorage.getItem('id');
    this.http.get<any[]>(`${this.api}/reservations`).subscribe(d => {
      this.myRes = d.filter(r => r.clientId === myId);
    });
  }
}
