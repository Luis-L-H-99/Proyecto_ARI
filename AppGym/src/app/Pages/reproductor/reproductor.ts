import { Component } from '@angular/core';
import { ReproductorVideo } from "../../Components/reproductor-video/reproductor-video";

@Component({
  selector: 'app-reproductor',
  standalone: true,
  imports: [ReproductorVideo],
  templateUrl: './reproductor.html',
  styleUrl: './reproductor.scss',
})
export class Reproductor {

}
