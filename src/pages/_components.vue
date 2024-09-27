<template>
  <div class="flex flex-col gap-4 p-8">
    <h1 class="text-3xl font-bold">Hello, world!</h1>

    <p class="text-theme-300">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vero
      earum error neque laudantium voluptate debitis? Natus magni sapiente, sit
      quis officiis velit. Fugit, vel maiores odio quis earum dolore?
    </p>

    <p class="text-sm text-theme-500">
      *Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    </p>

    <div class="flex items-center gap-2">
      <Button text="Small Button" size="small" />
      <Button text="Accent Button" variant="accent" size="small" />
    </div>

    <div class="flex items-center gap-2">
      <Button text="Regular Button" />
      <Button text="Accent Button" icon="favorite" variant="accent" />
      <Button text="Warning Button" variant="warning" />
      <Button text="Error Button" variant="error" />
      <Button text="Transparent Button" variant="transparent" />
    </div>

    <div class="flex items-center gap-2">
      <Button text="Large Button" size="large" />
      <Button text="Accent Button" variant="accent" size="large" />
    </div>

    <div class="flex w-[300px] flex-col gap-4">
      <InputText id="1" />
      <InputText id="2" placeholder="With Placeholder" />
      <InputText id="3" label="With Label" />
      <InputText id="4" label="With Icon" icon="language" />
    </div>
  </div>
</template>
