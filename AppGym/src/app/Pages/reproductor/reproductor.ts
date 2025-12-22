import { Component } from '@angular/core';
import { ListaVideo } from "../../Components/lista-video/lista-video";
import { ReproductorVideo } from "../../Components/reproductor-video/reproductor-video";

@Component({
  selector: 'app-reproductor',
  imports: [ListaVideo, ReproductorVideo],
  templateUrl: './reproductor.html',
  styleUrl: './reproductor.scss',
})
export class Reproductor {

}
