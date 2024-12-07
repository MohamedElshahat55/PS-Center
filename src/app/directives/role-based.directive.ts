import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appRoleBased]',
  standalone: true,
})
export class RoleBasedDirective implements OnInit {
  @Input() appRoleBased!: string;
  private currentUserRole!: string;

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the user role changes
    this.authService.userInfo.subscribe((res) => {
      this.currentUserRole = res?.user?.role || 'USER';
      this.updateVisibility();
    });
  }

  private updateVisibility() {
    // Split the appRoleBased input into an array of roles
    const roles = this.appRoleBased.split('|').map((role) => role.trim());

    if (roles.includes(this.currentUserRole)) {
      this.el.nativeElement.style.display = 'block';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
