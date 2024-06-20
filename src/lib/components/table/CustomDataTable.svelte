<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { formatDate } from '$lib/utils.js';

	export let tableName: string;
	export let columns: { label: string; field: string }[] = [];
	export let data: Array<any>[] = [];
	export let className: string = '';
	export let totalItemsCount: number;

	let searchQuery: string = '';

	const dispatch = createEventDispatcher();

	// Event handlers
	function handleNext() {
		dispatch('nextPage');
	}

	function handlePrevious() {
		dispatch('previousPage');
	}

	function handlePageChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		dispatch('pageChange', target.value);
	}

	function handleSearch() {
		dispatch('search', searchQuery);
	}

	function truncateText(text: string, maxLength: number, useEllipsis: boolean = true): string {
		if (text.length <= maxLength) {
			return text;
		}

		const ellipsis = useEllipsis ? '...' : '';
		const adjustedMaxLength = useEllipsis ? maxLength - ellipsis.length : maxLength;

		return text.substring(0, adjustedMaxLength) + ellipsis;
	}
</script>

<div class="px-4 sm:px-6 lg:px-8 lg:py-10 border border-gray-200 rounded {className}">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold leading-6 text-gray-800">{tableName}</h1>
		</div>
		<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
	</div>
	<div class="relative mt-5">
		<div aria-hidden="true" class="absolute inset-0 flex items-center">
			<div class="w-full border-t border-gray-200"></div>
		</div>
		<div class="relative flex justify-center"></div>
	</div>
	<div>
		<div class="mt-2 flex rounded-md shadow-sm">
			<div class="relative flex flex-grow items-stretch focus-within:z-10">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						class="h-5 w-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<input
					bind:value={searchQuery}
					class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					id="search"
					name="search"
					on:input={handleSearch}
					placeholder="Search here..."
				/>
			</div>
		</div>
	</div>
	<div class="mt-8 overflow-x-auto">
		<table class="min-w-full divide-y divide-gray-300">
			<thead>
				<tr>
					{#each columns as column}
						<th
							class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 uppercase"
							scope="col"
						>
							{column.label}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				{#each data as item}
					<tr>
						{#each columns as column}
							<td
								class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:pl-0"
							>
								{#if column.field === 'created_at' || column.field === 'updated_at'}
									{formatDate(item[column.field])}
								{:else}
									{item[column.field]}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<nav
		aria-label="Pagination"
		class="flex items-center justify-between border-t border-gray-200 bg-white py-3"
	>
		<div class="hidden sm:block">
			<p class="text-sm text-gray-700">
				Showing
				<span class="font-medium">1</span>
				to
				<span>
					<select
						class="mt-2 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
						id="page_size"
						name="page_size"
						on:change={handlePageChange}
					>
						<option selected>10</option>
						<option>20</option>
						<option>50</option>
						<option>100</option>
					</select>
				</span>
				of
				<span class="font-medium">{totalItemsCount}</span>
				results
			</p>
		</div>
		<div class="flex flex-1 justify-between sm:justify-end">
			<button
				class="relative inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-100 hover:bg-blue-400 focus-visible:outline-offset-0"
				on:click|preventDefault={handlePrevious}
			>
				Previous
			</button>
			<button
				class="relative inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-100 hover:bg-blue-400 focus-visible:outline-offset-0"
				on:click|preventDefault={handleNext}
			>
				Next
			</button>
		</div>
	</nav>
</div>
