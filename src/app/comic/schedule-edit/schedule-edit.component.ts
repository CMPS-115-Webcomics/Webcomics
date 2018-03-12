import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';

@Component({
  selector: 'wcm-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent {
  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public selectedDays: Set<string> = new Set();
  private initialDays: Set<string>;
  public loaded = false;

  constructor(
    private comicsService: ComicService
  ) {
    comicsService.getSchedule().then(days => {
      for (let day of days) {
        this.selectedDays.add(this.days[day - 1]);
      }
      this.setClean();
      this.loaded = true;
    });
  }

  public update() {
    let updateDays = Array.from(this.selectedDays, (day) => this.days.indexOf(day) + 1);
    this.comicsService.updateSchedule(updateDays);
    this.setClean();
  }

  private setClean() {
    this.initialDays = new Set(this.selectedDays.values());
  }

  public hasChanged() {
    if (this.selectedDays.size !== this.initialDays.size)
      return true;
    for (let item of Array.from(this.selectedDays.values())) {
      if (!this.initialDays.has(item))
        return true;
    }
    return false;
  }

  public toggle(day) {
    if (this.selectedDays.has(day))
      this.selectedDays.delete(day);
    else
      this.selectedDays.add(day);
  }

  public getColor(day) {
    return this.selectedDays.has(day) ? 'accent' : 'none';
  }

}
