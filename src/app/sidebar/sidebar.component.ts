import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef;

  ngAfterViewInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth < 960) {
      this.sidebar.nativeElement.style.width = '0';
    } else {
      this.sidebar.nativeElement.style.width = '240px';
    }
  }
}
