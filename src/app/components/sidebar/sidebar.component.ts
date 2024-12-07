import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleBasedDirective } from '../../directives/role-based.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RoleBasedDirective],
  template: `
    <div
      class="flex w-16 flex-col justify-between  border border-gray-400 bg-gray-100 py-3 rounded-full  -bottom-5 left-1/2 shadow-md rotate-90 fixed z-40 dark:bg-slate-950 dark:border-none  "
    >
      <div>
        <div class="border-gray-100">
          <div class="px-2">
            <ul class="space-y-1 border-gray-100 pt-4">
              <li>
                <a
                  routerLink="/devices"
                  class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-slate-900  "
                >
                  <span
                    ><i
                      class="fa-solid fa-desktop -rotate-90 dark:text-white"
                    ></i
                  ></span>
                  <span
                    class="-rotate-90 invisible absolute start-full top-1/2 -ms-20 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible  "
                  >
                    Devices
                  </span>
                </a>
              </li>

              <div appRoleBased="ADMIN | OWNER">
                <li>
                  <a
                    routerLink="/sessions"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-slate-900"
                  >
                    <span
                      ><i
                        class="fa-solid fa-gamepad -rotate-90 dark:text-white"
                      ></i
                    ></span>

                    <span
                      class="-rotate-90 invisible absolute start-full top-1/2 -ms-20 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                    >
                      Sessions
                    </span>
                  </a>
                </li>
              </div>

              <div appRoleBased="ADMIN | OWNER">
                <li>
                  <a
                    routerLink="/orders"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-slate-900"
                  >
                    <span
                      ><i class="fa-solid fa-box -rotate-90 dark:text-white"></i
                    ></span>

                    <span
                      class="-rotate-90 invisible absolute start-full top-1/2 -ms-20 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                    >
                      Orders
                    </span>
                  </a>
                </li>
              </div>

              <li>
                <a
                  routerLink="/snacks"
                  class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-slate-900"
                >
                  <span
                    ><i
                      class="fa-solid fa-pizza-slice -rotate-90 dark:text-white"
                    ></i
                  ></span>

                  <span
                    class="-rotate-90 invisible absolute start-full top-1/2 -ms-20 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                  >
                    Snacks
                  </span>
                </a>
              </li>
              <div appRoleBased="ADMIN ">
                <li>
                  <a
                    routerLink="/dashboard"
                    class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-slate-900"
                  >
                    <span
                      ><i
                        class="fa-solid fa-chart-line -rotate-90 dark:text-white"
                      ></i
                    ></span>

                    <span
                      class="-rotate-90 invisible absolute start-full top-1/2 -ms-20 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                    >
                      Dashboard
                    </span>
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SidebarComponent {}
