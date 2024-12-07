import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <section
      class="flex flex-col justify-end items-center container mx-auto px-20  border-t pt-10 dark:bg-slate-950 dark:text-white dark:border-t-0"
    >
      <h1 class="font-bold text-sm md:text-xl lg:text-2xl mb-3">
        <span class="text-blue-500">PSC</span> Management
      </h1>
      <!-- Social-icons -->
      <div class="flex gap-4 mb-4">
        <a href="https://github.com/MohamedElshahat55"
          ><i class="fa-brands fa-github fa-xl cursor-pointer"></i
        ></a>
        <a href="https://www.linkedin.com/in/mohamed-elshahat-4017a1303"
          ><i class="fa-brands fa-linkedin fa-xl cursor-pointer"></i
        ></a>
      </div>
      <!-- description -->
      <div>
        <p class="text-center text-slate-600 text-sm dark:text-slate-400">
          This PlayStation Center Management System is designed to efficiently
          manage devices, snacks orders, and gaming sessions. With this
          comprehensive system, you can easily organize and track the usage of
          PlayStation devices, handle snack orders, and facilitate gaming
          sessions. Streamline your center's operations and provide a seamless
          gaming experience for your customers. Explore our innovative
          management solution today.
        </p>
      </div>
      <!-- Contact Me -->
      <div class="my-4 flex gap-4">
        <div class="flex items-center gap-2">
          <span><i class="fa-solid fa-mobile-screen-button"></i></span>
          <span class="text-xs">+20 0155433703 </span>
        </div>
        <div class="flex gap-2 items-center">
          <span><i class="fa-solid fa-location-dot"></i></span>
          <span class="text-xs">123 Main Street, City, Country</span>
        </div>
      </div>
    </section>
  `,
})
export class FooterComponent {}
