<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: ''
});
</script>

<template>
  <div class="font-sans text-[#555] dark:text-slate-300">

    <section id="contact" class="container mx-auto px-4 py-12 md:py-12">
      <div class="flex flex-col md:flex-row gap-10 lg:gap-16 items-stretch justify-center">

        <div class="w-full md:w-1/2 lg:max-w-lg bg-white dark:bg-slate-800 p-6 md:p-8 rounded-lg shadow-md dark:border dark:border-slate-700 flex flex-col">
          <form class="flex flex-col gap-5 flex-grow" action="https://formspree.io/f/movekeap" method="POST">
            <div class="form-group">
              <input type="text" placeholder="Name" name="name" v-model="form.name"
                class="w-full p-4 border border-[#ddd] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] transition text-[#333] placeholder:text-[#aaa]
                       dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400" />
            </div>
            <div class="form-group">
              <input type="email" placeholder="Email" name="email" v-model="form.email"
                class="w-full p-4 border border-[#ddd] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] transition text-[#333] placeholder:text-[#aaa]
                       dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400" />
            </div>
            <div class="form-group flex-grow flex">
              <textarea name="message" id="message" placeholder="message" v-model="form.message"
                class="w-full p-4 border-2 border-[#6C5CE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]/50 transition resize-none text-[#333] placeholder:text-[#aaa] flex-grow
                       dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400"></textarea>
            </div>
            <div class="form-group">
              <button type="submit"
                class="w-full bg-[#b4aeff] text-white font-bold py-4 px-6 rounded-md hover:bg-[#5a4bcf] transition-all duration-300 transform hover:-translate-y-0.5">
                Send message
              </button>
            </div>
          </form>
        </div>

        <div class="w-full md:w-1/2 lg:max-w-lg flex flex-col justify-center gap-6">
          <div class="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md dark:border dark:border-slate-700 flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div class="flex-shrink-0 bg-[#E8E6FC] text-[#5d51e8] w-12 h-12 rounded-lg flex items-center justify-center shadow-sm
                         dark:bg-slate-700 dark:text-[#a5b4fc]">
              <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-lg text-[#333] dark:text-slate-100">Address</h4>
              <p>Condongcatur, Yogyakarta, Indonesia</p>
            </div>
          </div>
          <a href="https://wa.me/628978219364" target="_blank" rel="noopener noreferrer" class="block transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div class="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md dark:border dark:border-slate-700 flex items-center gap-4 h-full">
              <div class="flex-shrink-0 bg-[#E8E6FC] text-[#5d51e8] w-12 h-12 rounded-lg flex items-center justify-center shadow-sm
                           dark:bg-slate-700 dark:text-[#a5b4fc]">
                <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" /></svg>
              </div>
              <div>
                <h4 class="font-bold text-lg text-[#333] dark:text-slate-100">Phone</h4>
                <p>(+62)897-8219-364</p>
              </div>
            </div>
          </a>
          <a href="mailto:bagusputrawiratama24@gmail.com" class="block transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div class="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md dark:border dark:border-slate-700 flex items-center gap-4 h-full">
              <div class="flex-shrink-0 bg-[#E8E6FC] text-[#5d51e8] w-12 h-12 rounded-lg flex items-center justify-center shadow-sm
                             dark:bg-slate-700 dark:text-[#a5b4fc]">
                <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" /></svg>
              </div>
              <div>
                <h4 class="font-bold text-lg text-[#333] dark:text-slate-100">Email</h4>
                <p>bagusputrawiratama24@gmail.com</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <footer class="bg-white dark:bg-slate-800 py-8 text-center mt-12 md:mt-20 border-t border-[#eee] dark:border-t dark:border-slate-700">
      <div class="flex justify-center gap-6 mb-4">
        <a href="https://www.instagram.com/bagus_putra_w/" target="_blank"
          class="text-[#333] dark:text-slate-400 hover:text-[#6C5CE7] dark:hover:text-[#a5b4fc] transition-all transform hover:-translate-y-1">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        </a>
        <a href="https://www.linkedin.com/in/bagus-putra-wira-atama-592b21235/" target="_blank" class="text-[#333] dark:text-slate-400 hover:text-[#6C5CE7] dark:hover:text-[#a5b4fc] transition-all transform hover:-translate-y-1">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
        </a>
        <a href="https://x.com/BAGUSPUTRA28818" target="_blank" class="text-[#333] dark:text-slate-400 hover:text-[#6C5CE7] dark:hover:text-[#a5b4fc] transition-all transform hover:-translate-y-1">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
        </a>
        <a href="https://github.com/REXSY06" target="_blank" class="text-[#333] dark:text-slate-400 hover:text-[#6C5CE7] dark:hover:text-[#a5b4fc] transition-all transform hover:-translate-y-1">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
        </a>
      </div>
      <p class="text-sm text-[#555] dark:text-slate-400">&#169; 2025 - Made by Bagus Putra</p>
    </footer>

  </div>
</template>
