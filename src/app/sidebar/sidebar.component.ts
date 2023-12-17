import { AfterViewInit, Component, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
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
