<!-- Template component for all SVG masks used throughout the app -->

<template>
  <svg
    class="pointer-events-none absolute -left-[1px] -top-[1px] h-[1px] w-[1px]"
    viewBox="0 0 1 1">
    <mask
      id="mask_userIconBubble_double"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1">
      <circle fill="white" :cx="1 / 3" :cy="1 / 3" :r="1 / 3" />

      <circle fill="black" :cx="2 / 3" :cy="2 / 3" :r="(1 / 3) * 1.25" />
      <circle fill="white" :cx="2 / 3" :cy="2 / 3" :r="1 / 3" />
    </mask>

    <mask
      id="mask_userIconBubble_triple"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1">
      <circle fill="white" :cx="1 / 3" :cy="1 / 3" :r="1 / 3" />

      <circle fill="black" :cx="1 / 3" :cy="2 / 3" :r="(1 / 3) * 1.25" />
      <circle fill="white" :cx="1 / 3" :cy="2 / 3" :r="1 / 3" />

      <circle fill="black" :cx="2 / 3" :cy="0.5" :r="(1 / 3) * 1.25" />
      <circle fill="white" :cx="2 / 3" :cy="0.5" :r="1 / 3" />
    </mask>
  </svg>
</template>
