import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EscolaComponent } from "./pages/escola/escola.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EscolaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SIME-web-dashboard';
}
