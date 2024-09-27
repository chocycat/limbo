<template>
  <div class="flex flex-col gap-4 p-8">
    <h1 class="text-3xl font-bold">Components</h1>

    <p class="text-theme-300">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo vero
      earum error neque laudantium voluptate debitis? Natus magni sapiente, sit
      quis officiis velit. Fugit, vel maiores odio quis earum dolore?
    </p>

    <p class="text-sm text-theme-500">
      *Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    </p>

    <h2 class="text-lg font-bold">Buttons</h2>

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

    <h2 class="text-lg font-bold">Text Inputs</h2>

    <div class="grid w-[600px] grid-cols-2 gap-4">
      <InputText id="1" />
      <InputText id="2" placeholder="With Placeholder" />
      <InputText id="3" label="With Label" />
      <InputText id="4" label="With Icon" icon="language" />
    </div>

    <h2 class="text-lg font-bold">Cards</h2>

    <div class="grid w-full grid-cols-2 gap-4">
      <Card :clickable="true">
        <h3 class="text-lg font-bold">Card #1</h3>
        <p class="text-theme-300">
          <b class="text-theme-50">Hover over me!</b> Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Animi obcaecati delectus,
          similique, sit laboriosam et illo dolores quis, vero ducimus nulla
          tempora nesciunt distinctio velit corporis aperiam.
        </p>
      </Card>
      <Card>
        <h3 class="text-lg font-bold">Card #2</h3>
        <p class="text-theme-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
          obcaecati delectus, similique, sit laboriosam, vero ducimus nulla
          tempora nesciunt.
        </p>

        <template #footer>
          <div class="ml-auto flex items-center gap-2">
            <Button text="Cancel" size="small" variant="transparent" />
            <Button text="OK" size="small" variant="accent" />
          </div>
        </template>
      </Card>
    </div>

    <h2 class="text-lg font-bold">Alerts</h2>

    <div class="flex flex-col gap-4">
      <Alert variant="theme">
        <template #title>Simple Alert</template>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Alert>
      <Alert variant="accent">
        <template #title>Accent Alert</template>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Alert>
      <Alert variant="warning">
        <template #title>Warning Alert</template>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Alert>
      <Alert variant="error">
        <template #title>Error Alert</template>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Alert>
    </div>
  </div>
</template>
