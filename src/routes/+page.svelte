<script lang="ts">
	import { onMount } from 'svelte';
	import CustomDataTable from '$lib/components/table/CustomDataTable.svelte';
	import { apiGet } from '$lib/api.ts';
	import { getQueryParameters } from '$lib/utils.js';

	// Component state
	let tableName: string;
	let currentTab: string = 'employee';
	let columns: { label: string; field: string }[] = [];
	let data: Array<any>[] = [];
	let nextPage: string;
	let previousPage: string;
	let currentPage: string;
	let pageSize: number = 10;
	let totalItemsCount: number;
	let searchQuery: string = '';

	let isEmployeeTableActive: boolean;
	let isLeadTableActive: boolean;
	let isLoading: boolean = true;

	// Function to change the active table
	function changeTable(tab: string) {
		switch (tab) {
			case 'employee':
				currentTab = 'employee';
				tableName = 'Employee Data Table';
				isEmployeeTableActive = true;
				isLeadTableActive = false;
				columns = [
					{ label: 'First Name', field: 'first_name' },
					{ label: 'Last Name', field: 'last_name' },
					{ label: 'Urn', field: 'urn' },
					{ label: 'Lead ID', field: 'lead_id' },
					{ label: 'Created At', field: 'created_at' },
					{ label: 'Updated At', field: 'updated_at' }
				];
				getEmployeeList(currentPage);
				break;
			case 'lead':
				currentTab = 'lead';
				tableName = 'Leads Data Table';
				isLeadTableActive = true;
				isEmployeeTableActive = false;
				columns = [
					{ label: 'LinkedIn Url', field: 'linkedin_url' }, // Adjust fields according to actual API response
					{ label: 'Company Name LinkedIn', field: 'company_name_linkedin' },
					{ label: 'Urn', field: 'urn' },
					{ label: 'Campaign ID', field: 'campaign_id' },
					{ label: 'N Employees', field: 'n_employees' },
					{ label: 'Created At', field: 'created_at' },
					{ label: 'Updated At', field: 'updated_at' }
				];
				getLeadList(currentPage);
				break;
		}
	}

	// Set default table values
	function setDefaultValues() {
		tableName = 'Employee Data Table';
		isEmployeeTableActive = true;
		isLeadTableActive = false;
		columns = [
			{ label: 'First Name', field: 'first_name' },
			{ label: 'Last Name', field: 'last_name' },
			{ label: 'Urn', field: 'urn' },
			{ label: 'Lead ID', field: 'lead_id' },
			{ label: 'Created At', field: 'created_at' },
			{ label: 'Updated At', field: 'updated_at' }
		];
		isLoading = false;
	}

	// Fetch employee list from API
	async function getEmployeeList(page: string = '1') {
		try {
			const response: any = await apiGet(
				`http://localhost:8000/api/v1/employee?page=${page}&page_size=${pageSize}&search=${searchQuery}`
			);
			data = response.items;
			nextPage = getQueryParameters(response.next_page)['page'];
			previousPage = getQueryParameters(response.previous_page)['page'];
			totalItemsCount = response.total_items_count;
			currentPage = page;
		} catch (error) {
			console.error('Error fetching data:', error);
			// Handle error as needed
		}
	}

	// Fetch leads list from API
	async function getLeadList(page: string = '1') {
		try {
			const response: any = await apiGet(
				`http://localhost:8000/api/v1/leads?page=${page}&page_size=${pageSize}&search=${searchQuery}`
			);
			data = response.items;
			nextPage = getQueryParameters(response.next_page)['page'];
			previousPage = getQueryParameters(response.previous_page)['page'];
			totalItemsCount = response.total_items_count;
			currentPage = page;
		} catch (error) {
			console.error('Error fetching data:', error);
			// Handle error as needed
		}
	}

	// Event handlers for changing page
	function handlePageChange(event: CustomEvent) {
		pageSize = event.detail;

		switch (currentTab) {
			case 'employee':
				getEmployeeList(currentPage);
				break;
			case 'lead':
				getLeadList(currentPage);
				break;
		}
	}

	// Event handlers for next page view
	function handleNextPage() {
		switch (currentTab) {
			case 'employee':
				getEmployeeList(nextPage);
				break;
			case 'lead':
				getLeadList(nextPage);
				break;
		}
	}

	// Event handlers for previous page view
	function handlePreviousPage() {
		switch (currentTab) {
			case 'employee':
				getEmployeeList(previousPage);
				break;
			case 'lead':
				getLeadList(previousPage);
				break;
		}
	}

	// Event handlers for page search filter
	function handleSearch(event: CustomEvent) {
		searchQuery = event.detail;
		switch (currentTab) {
			case 'employee':
				getEmployeeList('1');
				break;
			case 'lead':
				getLeadList('1');
				break;
		}
	}

	// Lifecycle hook
	onMount(async () => {
		setDefaultValues();
		await getEmployeeList();
	});
</script>

{#if !isLoading}
	<main>
		<div>
			<div>
				<nav aria-label="Tabs" class="flex space-x-8 mt-2">
					<button
						class="whitespace-nowrap px-1 py-4 text-sm border-b-2 border-blue-500 text-blue-600 font-semibold"
						class:border-b-2={isEmployeeTableActive}
						class:border-blue-500={isEmployeeTableActive}
						class:text-blue-600={isEmployeeTableActive}
						on:click={() => changeTable('employee')}
					>
						Employees
					</button>
					<button
						class="whitespace-nowrap px-1 py-4 text-sm font-semibold"
						class:border-b-2={isLeadTableActive}
						class:border-blue-500={isLeadTableActive}
						class:text-blue-600={isLeadTableActive}
						on:click={() => changeTable('lead')}
					>
						Leads
					</button>
				</nav>
			</div>

			<div>
				<CustomDataTable
					className="mt-2"
					{columns}
					{tableName}
					{data}
					{totalItemsCount}
					on:nextPage={handleNextPage}
					on:previousPage={handlePreviousPage}
					on:pageChange={handlePageChange}
					on:search={handleSearch}
				/>
			</div>
		</div>
	</main>
{/if}
