<script lang="ts">
	export let data;
	let usr = data.user;

	function refreshPage() {
    location.reload(); // Reloads the current page
  }
</script>

<div class="flex w-full h-screen break-words">
	<div class="flex bg-neutral-900 text-neutral-100 justify-center items-center w-full break-words">
		<div class="">
			<div class="text-9xl text-teal-500 font-extrabold">
					<div class="text-5xl text-neutral-100 font-thin">{data.patientName.data[0].firstName} {data.patientName.data[0].lastName}</div>
					<div class="text-xl text-neutral-100 font-thin">{data.patientName.data[0].glucoseMeasurement.Timestamp}</div>
				<div class="flex items-end justify-start">
					<div>{data.glucoseValue}</div>
					<div class="text-3xl">mg/dL</div>
				</div>

			</div>

			<div class="text-3xl sm:text-5xl lg:text-7xl font-semibold text-neutral-300 mt-5">Blood Glucose</div>
			<div class="p-6 bg-neutral-800 rounded mt-5">

				<div class="text-2xl font-thin">
					<!-- <div>Name: {usr.firstName} {usr.lastName}</div> -->
				</div>



				<div class="">
					<div class="text-3xl font-semibold">Alarms</div>

					<div class="flex gap-2">
						<div class="text-3xl text-neutral-100 font-thin">High: {data.patientName.data[0].targetHigh}</div>
						<div class="text-3xl text-neutral-100 font-thin">Low: {data.patientName.data[0].targetLow}</div>
					</div>
				</div>


				<div class="mt-5">
					<div class="text-3xl font-semibold">Ranges</div>

					<div class="flex gap-2">
						<div class="text-3xl text-neutral-100 font-thin">High: {data.patientName.data[0].targetHigh}</div>
						<div class="text-3xl text-neutral-100 font-thin">Low: {data.patientName.data[0].targetLow}</div>
					</div>
				</div>


			</div>

			<div class="w-full flex flex-col items-center justify-center gap-2 my-5">
				<a href="javascript:void(0)" on:click={refreshPage} class="border border-teal-500 md:hover:border-teal-400 text-teal-500 hover:text-teal-400 transition-all duration-200 text-neutral-900 py-4 px-6 rounded w-full font-bold uppercase flex justify-center">Refresh</a>
				<a href="mailto:jc9361@gmail.com" class="bg-teal-500 md:hover:bg-teal-400 transition-all duration-200 text-neutral-900 py-4 px-6 rounded w-full font-bold uppercase flex justify-center">Send Message</a>
			</div>

			<div class="w-md break-word">
				<div>
					Visit <a href="https://github.com/engaeintellect/engage-glucose"><span class="underline">repository</span></a> to read the documentation
				</div>			

			</div>
		</div>
	</div>
</div>
