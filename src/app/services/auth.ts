// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5003'; // ⚠️ ajuste el port si usas otro

  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<{ id: string; role: string } | null> {
    const collections = ['admins', 'receptionistes', 'clients'];

    for (const col of collections) {
      const url = `${this.api}/${col}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const res: any[] = await firstValueFrom(this.http.get<any[]>(url));

      if (res.length) {
        // On a trouvé un utilisateur
        return { id: res[0].id, role: col.slice(0, -1) }; // supprime le "s" (admins → admin)
      }
    }
    return null;
  }
}
