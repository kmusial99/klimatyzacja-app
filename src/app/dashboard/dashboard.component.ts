import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

//
//   async getHtml() {
//     return `
//             <h1>Welcome back, Dom</h1>
//             <p>
//             Yo man
//             </p>
// <!--            <p>-->
// <!--                <a href="/posts" data-link>View recent posts</a>.-->
// <!--            </p>-->
//         `;
//   }
}

