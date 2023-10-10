<script lang="ts">
	import { showEvents } from '$lib/stores';
	import { onDestroy } from 'svelte';
	export let data: any;

	// let showEvents = false;
	let showAlarms = true;

	function refreshPage() {
		location.reload(); // Reloads the current page
	}

	function fetchData() {
		location.reload();
	}

	// Refresh data every 30 seconds
	const intervalId = setInterval(fetchData, 30000);

	// Clear the interval when the component is destroyed to prevent memory leaks
	onDestroy(() => {
		clearInterval(intervalId);
	});

	function toggleEvents() {
		showEvents.update((n) => !n);
	}
</script>

<!-- <div class="text-red-500">{$showEvents}</div> -->

<div class="flex w-full h-full min-h-screen break-words">
	<div
		class="flex bg-neutral-900 text-neutral-100 justify-center items-start md:items-center w-full break-words py-5"
	>
		<div class="w-full max-w-xl mx-auto px-6">
			<div class="">
				<div class="text-4xl text-neutral-100 font-thin">
					{data.patient.data[0].firstName}
					{data.patient.data[0].lastName}
				</div>
				<div class="text-base md:text-xl text-neutral-300 font-thin">
					{data.patient.data[0].glucoseMeasurement.Timestamp}
				</div>

				<!-- ################################################### -->
				<!-- CURRENT GLUCOSE -->
				<!-- ################################################### -->

				<div
					class="flex justify-between gap-1 h-full w-full items-end text-teal-500 font-extrabold text-7xl md:text-7xl lg:text-8xl my-5"
				>
					<div class="flex gap-1 items-end">
						<div>{data.glucoseValue}</div>
						<div class="text-2xl">mg/dL</div>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-16 h-full text-neutral-500"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
						/>
					</svg>
				</div>
			</div>

			<!-- ################################################### -->
			<!-- CURRENT STATUS -->
			<!-- ################################################### -->

			{#if !data.patient.data[0].glucoseMeasurement.isLow || !data.patient.data[0].glucoseMeasurement.isHigh}
				<div class="text-2xl sm:text-3xl font-semibold text-neutral-300">Blood Glucose Normal.</div>
			{:else}
				{#if data.patient.data[0].glucoseMeasurement.isLow}
					<div class="text-2xl sm:text-3xl font-semibold text-yellow-500">Glucose Low!</div>
				{/if}
				{#if !data.patient.data[0].glucoseMeasurement.isHigh}
					<div class="text-2xl sm:text-3xl font-semibold text-red-500">Glucose High!</div>
				{/if}
			{/if}

			<div class="w-full flex flex-col items-center justify-center gap-2">
				{#if showAlarms}
					<div class="p-4 bg-neutral-800 rounded w-full my-2">
						<div class="text-xl md:text-2xl text-neutral-200">
							<div class="flex gap-1 items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
									/>
								</svg>

								<div class="font-semibold">Alarms</div>
							</div>

							<div class="flex gap-5 text-lg md:text-xl font-thin">
								<div class="">High: {data.patient.data[0].targetHigh}</div>
								<div class="">Low: {data.patient.data[0].targetLow}</div>
							</div>
							<div>{JSON.stringify(data.patient.data, null, 2)}</div>
						</div>
					</div>
				{/if}

				<button
					class="border border-teal-500 md:hover:border-teal-400 text-teal-500 md:hover:text-teal-400 transition-all duration-200 py-4 px-6 rounded w-full font-bold uppercase flex justify-center"
					on:click={toggleEvents}
				>
					{#if $showEvents}
						<div class="flex gap-2 items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>

							<div>Hide Events</div>
						</div>
					{:else}
						<div class="flex gap-2 items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>

							<div>Show Events</div>
						</div>
					{/if}
				</button>

				<!-- ################################################### -->
				<!-- OUT OF BOUNDS EVENTS -->
				<!-- ################################################### -->
				{#if $showEvents}
					<div class="p-4 bg-neutral-800 rounded w-full">
						<div class="text-lg md:text-2xl text-neutral-200">
							<div class="flex gap-2 items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
									/>
								</svg>
								<div class="font-semibold">Range Events</div>
							</div>

							<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-2">
								{#each data.graphData.reverse() as graphData}
									{#if graphData.Value >= 120 || graphData.Value <= 70}
										<div class="flex flex-col items-start rounded">
											<div class="">
												<div class="text-red-500 font-semibold">
													{graphData.Value} <span class="text-sm text-neutral-100">mg/dL</span>
												</div>
											</div>
											<div class="text-neutral-300 text-xs">{graphData.Timestamp}</div>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				{/if}

				<a
					href="/"
					on:click={refreshPage}
					class="border border-teal-500 md:hover:border-teal-400 text-teal-500 md:hover:text-teal-400 transition-all duration-200 py-4 px-6 rounded w-full font-bold uppercase flex justify-center"
				>
					<div class="flex gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>

						<div>Refresh</div>
					</div>
				</a>

				<a
					href="mailto:jc9361@gmail.com"
					class="bg-teal-500 md:hover:bg-teal-400 transition-all duration-200 text-neutral-900 py-4 px-6 rounded w-full font-bold uppercase flex justify-center"
				>
					<div class="flex gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
							/>
						</svg>

						<div>Message</div>
					</div>
				</a>
			</div>

			<div class="text-sm w-md break-word mt-10 flex justify-center">
				<div>
					Visit <a href="https://github.com/engageintellect/engage-glucose"
						><span class="underline">repository</span></a
					> to read the documentation
				</div>
			</div>
		</div>
	</div>
</div>
