<script lang="ts">
	import { onDestroy } from 'svelte';
  export let data;
  let usr = data.user;

  function refreshPage() {
    location.reload(); // Reloads the current page
  }

  function fetchData() {
    // Refresh the 'data' object by reloading the page
    location.reload();
  }

  // Refresh data every 10 seconds
  const intervalId = setInterval(fetchData, 10000);

  // Clear the interval when the component is destroyed to prevent memory leaks
  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<div class="flex w-full min-h-screen break-words">
  <div class="flex bg-neutral-900 text-neutral-100 justify-center items-start md:items-center w-full break-words py-5">
    <div class="w-full max-w-xl mx-auto px-6">
      <div class="">
        <div class="text-4xl text-neutral-100 font-thin">{data.patient.data[0].firstName} {data.patient.data[0].lastName}</div>
        <div class="text-base md:text-xl text-neutral-300 font-thin">{data.patient.data[0].glucoseMeasurement.Timestamp}</div>

        <div class="flex text-teal-500 font-extrabold text-7xl md:text-7xl lg:text-9xl items-end justify-start my-5">
          <div>{data.glucoseValue}</div>
          <div class="text-3xl">mg/dL</div>
        </div>
      </div>

      <div class="text-2xl md:text-3xl sm:text-5xl font-semibold text-neutral-300">Blood Glucose Normal.</div>
      <div class="p-6 bg-neutral-800 rounded mt-2">
        <div class="text-xl md:text-2xl text-neutral-200">
          <div class="font-semibold">Alarms</div>
          <div class="flex gap-5 text-xl md:text-2xl font-thin">
            <div class="">High: {data.patient.data[0].targetHigh}</div>
            <div class="">Low: {data.patient.data[0].targetLow}</div>
          </div>
        </div>

        <div class="mt-5 text-lg md:text-2xl text-neutral-200">
          <div class="font-semibold">Ranges</div>
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
