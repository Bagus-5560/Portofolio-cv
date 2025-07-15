<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

// --- State untuk interaktivitas mouse ---
const pointer = ref({ x: 0, y: 0 })
const handleMouseMove = (event) => {
  pointer.value = { x: event.clientX, y: event.clientY }
}

// --- State untuk objek 3D ---
const torusRef = ref(null)

// --- Logika animasi 3D ---
const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
  if (torusRef.value) {
    torusRef.value.rotation.y += delta * 0.2
    torusRef.value.rotation.x += delta * 0.1
  }
})

// --- Lifecycle hooks untuk mouse listener ---
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <!-- PERUBAHAN KRITIS: Diubah menjadi background layer, bukan halaman -->
  <div class="fixed inset-0 -z-10">
    <!-- LAPISAN 1: EFEK BACKGROUND (DOT GRID & SPOTLIGHT) -->
    <div class="absolute inset-0 z-0">
      <!-- Pola Titik -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.slate.800)_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      <!-- Senter Interaktif -->
      <div
        class="pointer-events-none fixed inset-0 transition-all duration-300"
        :style="{
          background: `radial-gradient(600px circle at ${pointer.x}px ${pointer.y}px, rgba(56, 189, 248, 0.15), transparent 80%)`
        }"
      />
    </div>

    <!-- LAPISAN 2: CANVAS 3D -->
    <TresCanvas class="z-10">
      <TresPerspectiveCamera :position="[0, 1, 6]" />
      <TresAmbientLight :intensity="1" />
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" color="#A855F7" />

      <!-- Objek 3D utama -->
      <TresMesh ref="torusRef" :position="[0, 0.5, 0]">
        <TresTorusKnotGeometry :args="[1, 0.35, 128, 16]" />
        <TresMeshStandardMaterial
          color="#A855F7"
          :metalness="0.9"
          :roughness="0.2"
        />
      </TresMesh>
    </TresCanvas>

    <!-- PERUBAHAN KRITIS: Teks UI dihapus dari sini -->
  </div>
</template>
