import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { MomentService } from 'src/app/service/moment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl
  faSearchengin = faSearchengin
  searchTerm: string = ''

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const { data } = items

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })

      this.allMoments = data
      this.moments = data
    })
  }

  search(event: Event){
    const target = event.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter(moment => {
      return moment.title.toLocaleLowerCase().includes(value)
    })
  }

}
