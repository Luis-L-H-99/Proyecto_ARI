import { Component } from '@angular/core';
import { ReproductorVideo } from "../../Components/reproductor-video/reproductor-video";
import { ListaVideoComponent } from "../../Components/lista-video/lista-video";
@Component({
  selector: 'app-reproductor',
  standalone: true,
  imports: [ReproductorVideo, ListaVideoComponent],
  templateUrl: './reproductor.html',
  styleUrl: './reproductor.scss',
})
export class Reproductor {

}
