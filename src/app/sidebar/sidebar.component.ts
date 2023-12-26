import { AfterViewInit, Component, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.checkScreenSize();
      });
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
      if (this.sidebar && this.sidebar.nativeElement) {
        if (window.innerWidth < 960) {
          this.sidebar.nativeElement.style.width = '0';
        } else {
          this.sidebar.nativeElement.style.width = '240px';
        }
      } else {
        console.warn('Sidebar element is not available or undefined.');
      }
    } catch (error) {
      console.error('Error checking screen size:', error);
    }
  }
}
