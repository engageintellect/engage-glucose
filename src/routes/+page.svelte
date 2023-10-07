<script lang="ts">
	import { onDestroy } from 'svelte';
  export let data;
  let usr = data.user;

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
</script>

<div class="flex w-full h-full min-h-screen break-words">
  <div class="flex bg-neutral-900 text-neutral-100 justify-center items-start md:items-center w-full break-words py-5">
    <div class="w-full max-w-xl mx-auto px-6">
      <div class="">
        <div class="text-4xl text-neutral-100 font-thin">{data.patient.data[0].firstName} {data.patient.data[0].lastName}</div>
        <div class="text-base md:text-xl text-neutral-300 font-thin">{data.patient.data[0].glucoseMeasurement.Timestamp}</div>

        <div class="flex gap-1 h-full w-full items-end text-teal-500 font-extrabold text-7xl md:text-7xl my-5">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>

          <div>{data.glucoseValue}</div>
          <div class="text-3xl">mg/dL</div>


        </div>
      </div>

      <div class="text-2xl md:text-3xl sm:text-5xl font-semibold text-neutral-300">Blood Glucose Normal.</div>
      <div class="p-6 bg-neutral-800 rounded mt-2">
        <div class="text-xl md:text-2xl text-neutral-200">

          <div class="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="font-semibold">Alarms</div>
          </div>
          
          <div class="flex gap-5 text-xl md:text-2xl font-thin">
            <div class="">High: {data.patient.data[0].targetHigh}</div>
            <div class="">Low: {data.patient.data[0].targetLow}</div>
          </div>
        </div>

        <div class="mt-5 text-lg md:text-2xl text-neutral-200">

          <div class="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <div class="font-semibold">Ranges</div>
          </div>
          <div class="flex gap-5 font-thin">
            <div class="">High: {data.patient.data[0].targetHigh}</div>
            <div class="">Low: {data.patient.data[0].targetLow}</div>
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col items-center justify-center gap-2 my-5">
        <a href="javascript:void(0)" on:click={refreshPage} class="border border-teal-500 md:hover:border-teal-400 text-teal-500 md:hover:text-teal-400 transition-all duration-200 text-neutral-900 py-4 px-6 rounded w-full font-bold uppercase flex justify-center">Refresh</a>
        <a href="mailto:jc9361@gmail.com" class="bg-teal-500 md:hover:bg-teal-400 transition-all duration-200 text-neutral-900 py-4 px-6 rounded w-full font-bold uppercase flex justify-center">Send Message</a>
      </div>

      <div class="text-sm w-md break-word">
        <div>
          Visit <a href="https://github.com/engaeintellect/engage-glucose"><span class="underline">repository</span></a> to read the documentation
        </div>
      </div>
    </div>
  </div>
</div>
