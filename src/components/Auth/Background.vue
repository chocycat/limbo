<script lang="ts" setup>
const { dotColor, dotSize, spacing, speed } = withDefaults(
  defineProps<{
    dotColor?: string;
    dotSize?: number;
    spacing?: number;
    speed?: number;
  }>(),
  {
    dotColor: '#ffffff',
    dotSize: 2,
    spacing: 35,
    speed: 0.05,
  }
);

const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();
const { width, height } = useElementBounding(canvas);
const offset = ref(0);
const dpr = ref(1);
const animationFrameId = ref<number>();

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d', { alpha: true })!;
    resizeCanvas();
    animate();
  }
  window.addEventListener('resize', resizeCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId.value!);
  }
});

function resizeCanvas() {
  if (canvas.value) {
    dpr.value = window.devicePixelRatio || 1;
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    canvas.value.width = width.value * dpr.value;
    canvas.value.height = height.value * dpr.value;
    canvas.value.style.width = `${width}px`;
    canvas.value.style.height = `${height}px`;

    ctx.value?.scale(dpr.value, dpr.value);
  }
}

function drawDotGrid() {
  if (!ctx.value) return;

  ctx.value.clearRect(0, 0, width.value, height.value);

  ctx.value.save();
  ctx.value.translate(width.value / 2, height.value / 2);
  ctx.value.rotate(Math.PI / 4);
  ctx.value.translate(-width / 2, -height / 2);

  const extraCoverage = Math.max(width.value, height.value);

  ctx.value.fillStyle = dotColor;

  for (let x = -extraCoverage; x < width.value + extraCoverage; x += spacing) {
    for (
      let y = -extraCoverage;
      y < height.value + extraCoverage;
      y += spacing
    ) {
      ctx.value.beginPath();
      ctx.value.arc(x, y + offset.value, dotSize, 0, Math.PI * 2);
      ctx.value.fill();
    }
  }

  ctx.value.restore();
}

function animate() {
  offset.value = (offset.value - speed) % spacing;

  drawDotGrid();
  animationFrameId.value = requestAnimationFrame(animate);
}
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute left-0 top-0 h-full w-full" />
</template>
