import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// imports: [CommonModule, FormsModule]

@Component({
  selector: 'app-pago-page',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './pago-page.page.html',
  styleUrls: ['./pago-page.page.scss']
})
export class PagoPageComponent {
  total = 145;
  metodo = '';
}
