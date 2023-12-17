import { AfterViewInit, Component, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef;

  ngAfterViewInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    try {
      if (window.innerWidth < 960) {
        this.sidebar.nativeElement.style.width = '0';
      } else {
        this.sidebar.nativeElement.style.width = '240px';
      }
    } catch (error) {
      console.error('Error checking screen size:', error);
    }
  }
}
