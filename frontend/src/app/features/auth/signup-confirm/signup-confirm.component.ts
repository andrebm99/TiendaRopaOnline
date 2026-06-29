import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Particle {
  type: 'triangle' | 'square' | 'circle';
  color: 'fuchsia' | 'black';
  top: number;
  left: number;
  rotation: number;
  scale: number;
}

@Component({
  selector: 'app-signup-confirm',
  standalone: false,
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.scss']
})
export class SignupConfirmComponent implements OnInit {
  particles: Particle[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.generateParticles();
  }

  // === GENERAR PARTÍCULAS GEOMÉTRICAS FLOTANTES ===
  generateParticles(): void {
    const types: ('triangle' | 'square' | 'circle')[] = ['triangle', 'square', 'circle'];
    const colors: ('fuchsia' | 'black')[] = ['fuchsia', 'black'];

    for (let i = 0; i < 35; i++) {
      this.particles.push({
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        top: Math.floor(Math.random() * 85) + 5, // Posición vertical en %
        left: Math.floor(Math.random() * 85) + 5, // Posición horizontal en %
        rotation: Math.floor(Math.random() * 360),
        scale: parseFloat((Math.random() * 0.6 + 0.4).toFixed(2))
      });
    }
  }

  // Redireccionar al catálogo
  onGoToStore(): void {
    this.router.navigate(['/catalogo']);
  }
}
