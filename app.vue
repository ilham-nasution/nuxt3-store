<template>
  <div class="h-screen grid place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center">Login</h2>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </div>
        <div class="card-actions justify-center">
          <button class="btn btn-primary">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>
