import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Dashboard Admin</h1>

    <!-- Clients -->
    <h2>Clients</h2>
    <form (ngSubmit)="addClient()">
      <input [(ngModel)]="newClientNom" name="nom" placeholder="Nom" />
      <input [(ngModel)]="newClientEmail" name="email" placeholder="Email" />
      <button type="submit">Ajouter Client</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of clients">
          <td>{{ c.nom }}</td>
          <td>{{ c.email }}</td>
          <td>{{ c.telephone }}</td>
          <td>
            <button (click)="deleteClient(c.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Chambres -->
    <h2>Chambres</h2>
    <form (ngSubmit)="addChambre()">
      <input [(ngModel)]="newChambreNumero" name="numero" placeholder="Numéro"/>
      <input [(ngModel)]="newChambreType" name="type" placeholder="Type"/>
      <input [(ngModel)]="newChambrePrix" name="prix" placeholder="Prix"/>
      <label>
        Disponible ?
        <input type="checkbox" [(ngModel)]="newChambreDispo" name="dispo"/>
      </label>
      <button type="submit">Ajouter Chambre</button>
    </form>
    <table>
      <thead>
        <tr><th>Numéro</th><th>Type</th><th>Prix</th><th>Disponible</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let ch of chambres">
          <td>{{ ch.numero }}</td>
          <td>{{ ch.type }}</td>
          <td>{{ ch.prix }} €</td>
          <td>
            <input type="checkbox" [checked]="ch.disponible" (change)="toggleChambre(ch)" />
          </td>
          <td>
            <button (click)="deleteChambre(ch.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Réservations -->
    <h2>Réservations</h2>
    <form (ngSubmit)="addReservation()">
      <input [(ngModel)]="newResClientId" name="clientId" placeholder="ID Client"/>
      <input [(ngModel)]="newResChambreId" name="chambreId" placeholder="ID Chambre"/>
      <input type="date" [(ngModel)]="newResDebut" name="dateDebut"/>
      <input type="date" [(ngModel)]="newResFin" name="dateFin"/>
      <select [(ngModel)]="newResEtat" name="etat">
        <option value="en attente">En attente</option>
        <option value="confirmé">Confirmé</option>
        <option value="annulé">Annulé</option>
      </select>
      <button type="submit">Ajouter Réservation</button>
    </form>
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
          <td>
            <select [(ngModel)]="r.etat" (change)="updateReservation(r)">
              <option value="en attente">En attente</option>
              <option value="confirmé">Confirmé</option>
              <option value="annulé">Annulé</option>
            </select>
          </td>
          <td>
            <button (click)="deleteReservation(r.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminDashboardComponent implements OnInit {
  api = 'http://localhost:5003';
  clients: any[] = [];
  chambres: any[] = [];
  reservations: any[] = [];

  // Clients
  newClientNom = '';
  newClientEmail = '';

  // Chambres
  newChambreNumero = '';
  newChambreType = '';
  newChambrePrix = '';
  newChambreDispo = false;

  // Réservations
  newResClientId = '';
  newResChambreId = '';
  newResDebut = '';
  newResFin = '';
  newResEtat = 'en attente';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>(`${this.api}/clients`).subscribe(d => this.clients = d);
    this.http.get<any[]>(`${this.api}/chambres`).subscribe(d => this.chambres = d);
    this.http.get<any[]>(`${this.api}/reservations`).subscribe(d => this.reservations = d);
  }

  // CLIENTS
  addClient() {
    if (!this.newClientNom || !this.newClientEmail) return;
    const newC = { nom: this.newClientNom, email: this.newClientEmail, password: '1234', telephone: '0000000000' };
    this.http.post(`${this.api}/clients`, newC).subscribe(() => {
      this.newClientNom = '';
      this.newClientEmail = '';
      this.loadData();
    });
  }
  deleteClient(id: string) {
    this.http.delete(`${this.api}/clients/${id}`).subscribe(() => this.loadData());
  }

  // CHAMBRES
  addChambre() {
    const newCh = {
      numero: this.newChambreNumero,
      type: this.newChambreType,
      prix: this.newChambrePrix,
      disponible: this.newChambreDispo
    };
    this.http.post(`${this.api}/chambres`, newCh).subscribe(() => {
      this.newChambreNumero = '';
      this.newChambreType = '';
      this.newChambrePrix = '';
      this.newChambreDispo = false;
      this.loadData();
    });
  }
  toggleChambre(ch: any) {
    this.http.patch(`${this.api}/chambres/${ch.id}`, { disponible: !ch.disponible })
      .subscribe(() => this.loadData());
  }
  deleteChambre(id: string) {
    this.http.delete(`${this.api}/chambres/${id}`).subscribe(() => this.loadData());
  }

  // RÉSERVATIONS
  addReservation() {
    const newR = {
      clientId: this.newResClientId,
      chambreId: this.newResChambreId,
      dateDebut: this.newResDebut,
      dateFin: this.newResFin,
      etat: this.newResEtat
    };
    this.http.post(`${this.api}/reservations`, newR).subscribe(() => {
      this.newResClientId = '';
      this.newResChambreId = '';
      this.newResDebut = '';
      this.newResFin = '';
      this.newResEtat = 'en attente';
      this.loadData();
    });
  }
  updateReservation(r: any) {
    this.http.patch(`${this.api}/reservations/${r.id}`, { etat: r.etat }).subscribe();
  }
  deleteReservation(id: string) {
    this.http.delete(`${this.api}/reservations/${id}`).subscribe(() => this.loadData());
  }
}
