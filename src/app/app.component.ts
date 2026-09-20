import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="langelis">
      <h1>KMI skaičiuoklė</h1>

      <label>Svoris (kg)</label>
      <input type="number" name="svoris" [(ngModel)]="svoris">

      <label>Ūgis (cm)</label>
      <input type="number" name="ugis" [(ngModel)]="ugis">

      <button (click)="skaiciuoti()">Skaičiuoti</button>

      <div class="rezultatas">KMI: {{ kmi }}</div>
      <div class="kategorija">{{ kategorija }}</div>

      <div class="meter">
        <div class="rodykle" [style.left.%]="rodykle"></div>
        <div class="juosta">
          <div class="zema"></div>
          <div class="norma"></div>
          <div class="antsvoris"></div>
          <div class="nutukimas"></div>
        </div>
      </div>

      <div class="legendos">
        <span>Mažas</span>
        <span>Normalu</span>
        <span>Antsvoris</span>
        <span>Nutukimas</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      background: #eef3f8;
      font-family: Arial, sans-serif;
    }

    .langelis {
      margin-top: 60px;
      width: 360px;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    h1 {
      margin-top: 0;
      text-align: center;
      color: #1f4e79;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: bold;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 16px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 4px;
      background: #1f4e79;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background: #163a5a;
    }

    .rezultatas {
      margin-top: 20px;
      padding: 12px;
      text-align: center;
      background: #f3f7fb;
      border-radius: 4px;
      font-size: 20px;
      font-weight: bold;
    }

    .kategorija {
      margin: 10px 0 16px;
      text-align: center;
      font-weight: bold;
    }

    .meter {
      position: relative;
      margin-top: 18px;
    }

    .rodykle {
      position: absolute;
      top: -10px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 10px solid #222;
      transform: translateX(-50%);
    }

    .juosta {
      display: flex;
      height: 18px;
      overflow: hidden;
      border-radius: 9px;
    }

    .zema { flex: 3.5; background: #f4d03f; }
    .norma { flex: 6.5; background: #58d68d; }
    .antsvoris { flex: 5; background: #f5b041; }
    .nutukimas { flex: 10; background: #e74c3c; }

    .legendos {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 12px;
    }
  `]
})
export class AppComponent {
  svoris = 0;
  ugis = 0;
  kmi = 0;
  rodykle = 0;
  kategorija = '';

  skaiciuoti() {
    const ugisM = this.ugis / 100;
    this.kmi = +(this.svoris / (ugisM * ugisM)).toFixed(2);

    let proc = ((this.kmi - 15) / 25) * 100;
    if (proc < 0) {
      proc = 0;
    }
    if (proc > 100) {
      proc = 100;
    }
    this.rodykle = proc;

    if (this.kmi < 18.5) {
      this.kategorija = 'Per mažas svoris';
    } else if (this.kmi < 25) {
      this.kategorija = 'Normalu';
    } else if (this.kmi < 30) {
      this.kategorija = 'Antsvoris';
    } else {
      this.kategorija = 'Nutukimas';
    }
  }
}
