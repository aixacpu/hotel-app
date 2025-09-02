import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Dashboard Réceptionniste</h1>
    <table>
      <thead>
        <tr><th>ID</th><th>Client</th><th>Chambre</th><th>Date début</th><th>Date fin</th><th>État</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let r of reservations">
          <td>{{ r.id }}</td>
          <td>{{ r.clientId }}</td>
          <td>{{ r.chambreId }}</td>
          <td>{{ r.dateDebut }}</td>
          <td>{{ r.dateFin }}</td>
          <td>{{ r.etat }}</td>
          <td>
            <button (click)="updateReservation(r, 'confirmé')">Confirmer</button>
            <button (click)="updateReservation(r, 'annulé')">Annuler</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ReceptionDashboardComponent implements OnInit {
  api = 'http://localhost:5003';
  reservations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>(`${this.api}/reservations`).subscribe(d => this.reservations = d);
  }

  updateReservation(r: any, etat: string) {
    this.http.patch(`${this.api}/reservations/${r.id}`, { etat }).subscribe(() => this.loadData());
  }
}
