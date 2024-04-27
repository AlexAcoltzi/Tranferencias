import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css']
})
export class TransactionsHistoryComponent {

  @Input() showBody: boolean = true;
  @Input() showTite: boolean = true;
  @Input() customSize: boolean = false;

  ngOnInit(): void {
    this.createPieChart();
  }

  createPieChart(): void {
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          label: 'Dataset 1',
          data: [30, 40, 30], // Datos que llenarán los sectores del gráfico
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // Color del primer sector
            'rgba(54, 162, 235, 0.5)', // Color del segundo sector
            'rgba(255, 206, 86, 0.5)' // Color del tercer sector
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // Borde del primer sector
            'rgba(54, 162, 235, 1)', // Borde del segundo sector
            'rgba(255, 206, 86, 1)' // Borde del tercer sector
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

}
