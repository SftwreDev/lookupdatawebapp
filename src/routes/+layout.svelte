<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let isLoading: boolean = true;

	onMount(() => {
		isLoading = false;
	});
</script>

<div class="min-h-full">
	<div class="bg-gray-800 pb-32">
		<nav class="bg-gray-800">
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div class="border-b border-gray-700">
					<div class="flex h-16 items-center justify-between px-4 sm:px-0">
						<div class="flex items-center">
							<div class="flex-shrink-0"></div>
						</div>
						<div class="hidden md:block"></div>
						<div class="-mr-2 flex md:hidden"></div>
					</div>
				</div>
			</div>
		</nav>
		<header class="py-10">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl font-bold tracking-tight text-white">Lookup Data Table</h1>
			</div>
		</header>
	</div>

	{#if !isLoading}
		<main class="-mt-32">
			<div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
				<div class="rounded-lg bg-white px-5 py-6 shadow sm:px-8">
					<slot></slot>
				</div>
			</div>
		</main>
	{/if}
</div>
